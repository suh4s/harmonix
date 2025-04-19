from typing import Any, List
import os
from pathlib import Path
import shutil
import uuid

from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db.database import get_db
from backend.dependencies import get_current_active_user
from backend.models.user import User
from backend.schemas.document import DocumentResponse
from backend.crud import document as document_crud

router = APIRouter()

# Directory for storing uploaded files - would use S3 in production
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


async def process_document(document_id: str, file_path: str):
    """
    Background task to process document content
    In a real implementation, this would extract text, analyze content, etc.
    """
    # TODO: Implement document text extraction and processing
    pass


@router.get("/", response_model=List[DocumentResponse])
async def list_documents(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve user documents.
    """
    documents = await document_crud.get_user_documents(
        db=db,
        user_id=current_user.id,
        skip=skip,
        limit=limit
    )
    return documents


@router.post("/", response_model=DocumentResponse)
async def upload_document(
    *,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Upload a new document.
    """
    try:
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1] if file.filename else ""
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file to disk
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Get file size
        file_size = os.path.getsize(file_path)
        
        # Create document record
        document_data = {
            "filename": file.filename,
            "content_type": file.content_type,
            "size": file_size,
            "storage_path": str(file_path),
            "content_text": None
        }
        
        document = await document_crud.create_document(
            db=db,
            user_id=current_user.id,
            document_data=document_data
        )
        
        # Schedule background processing task
        background_tasks.add_task(
            process_document,
            document_id=document.id,
            file_path=str(file_path)
        )
        
        return document
    except Exception as e:
        # Delete file if it was created
        if 'file_path' in locals() and os.path.exists(file_path):
            os.unlink(file_path)
        raise HTTPException(status_code=500, detail=f"Document upload failed: {str(e)}")


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    *,
    document_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get document by ID.
    """
    document = await document_crud.get_document(db=db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if document.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this document")
    
    return document


@router.delete("/{document_id}", response_model=dict)
async def delete_document(
    *,
    document_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Delete document.
    """
    document = await document_crud.get_document(db=db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if document.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to delete this document")
    
    # Delete file from storage
    try:
        if os.path.exists(document.storage_path):
            os.unlink(document.storage_path)
    except Exception as e:
        # Log error but continue with database deletion
        print(f"Error deleting file: {str(e)}")
    
    # Delete from database
    success = await document_crud.delete_document(db=db, document_id=document_id)
    return {"success": success} 