from typing import List, Optional
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.document import Document
from backend.schemas.document import DocumentCreate


async def get_document(db: AsyncSession, document_id: str) -> Optional[Document]:
    """Get a document by ID"""
    result = await db.execute(select(Document).filter(Document.id == document_id))
    return result.scalars().first()


async def get_user_documents(
    db: AsyncSession, 
    user_id: str, 
    skip: int = 0, 
    limit: int = 100
) -> List[Document]:
    """Get all documents for a user"""
    result = await db.execute(
        select(Document)
        .filter(Document.user_id == user_id)
        .order_by(Document.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()


async def create_document(
    db: AsyncSession,
    user_id: str,
    document_data: DocumentCreate,
) -> Document:
    """Create a new document record"""
    db_document = Document(
        user_id=user_id,
        filename=document_data.filename,
        content_type=document_data.content_type,
        size=document_data.size,
        storage_path=document_data.storage_path,
        content_text=document_data.content_text,
    )
    
    db.add(db_document)
    await db.commit()
    await db.refresh(db_document)
    return db_document


async def update_document_processing(
    db: AsyncSession,
    document_id: str,
    is_processed: bool = True,
    content_text: Optional[str] = None
) -> Optional[Document]:
    """Update a document's processing status and content"""
    document = await get_document(db, document_id)
    if not document:
        return None
        
    document.is_processed = is_processed
    if content_text is not None:
        document.content_text = content_text
    document.updated_at = datetime.utcnow()
    
    db.add(document)
    await db.commit()
    await db.refresh(document)
    return document


async def delete_document(db: AsyncSession, document_id: str) -> bool:
    """Delete a document"""
    document = await get_document(db, document_id)
    if not document:
        return False
        
    await db.delete(document)
    await db.commit()
    return True 