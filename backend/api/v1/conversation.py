from typing import Any, List, Optional
from datetime import datetime
import uuid

from fastapi import APIRouter, Depends, HTTPException, Body, Query
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from backend.db.database import get_db
from backend.dependencies import get_current_active_user
from backend.models.user import User
from backend.ai.workflow import run_consultation
from backend.ai.personalities import get_all_personalities
from backend.crud import conversation as conversation_crud
from backend.schemas.conversation import (
    ConversationCreate, 
    Conversation,
    ConversationResponse
)

router = APIRouter()


@router.get("/", response_model=List[Conversation])
async def list_conversations(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
) -> Any:
    """
    Retrieve user conversations.
    """
    conversations = await conversation_crud.get_user_conversations(
        db=db, 
        user_id=current_user.id,
        skip=skip,
        limit=limit
    )
    return conversations


@router.post("/", response_model=ConversationResponse)
async def create_consultation(
    consultation: ConversationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new consultation with AI personalities.
    """
    try:
        # Create conversation record in database
        db_conversation = await conversation_crud.create_conversation(
            db=db,
            user_id=current_user.id,
            input_text=consultation.input,
            personalities=consultation.personality_ids,
            title=consultation.title,
            context=consultation.context
        )
        
        # Run the consultation workflow
        result = await run_consultation(
            user_input=consultation.input,
            personalities=consultation.personality_ids,
            context=consultation.context
        )
        
        # Update conversation with results
        updated_conversation = await conversation_crud.update_conversation_responses(
            db=db,
            conversation_id=db_conversation.id,
            all_responses=result["all_responses"],
            summary=result["summary"],
            status=result["status"]
        )
        
        return updated_conversation
    except Exception as e:
        # Log the error
        print(f"Error creating consultation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/personalities", response_model=List[dict])
async def get_personalities() -> Any:
    """
    Get available AI personalities.
    """
    return get_all_personalities()


@router.get("/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(
    conversation_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get conversation by ID.
    """
    conversation = await conversation_crud.get_conversation(db=db, conversation_id=conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if conversation.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this conversation")
    
    return conversation


@router.delete("/{conversation_id}", response_model=dict)
async def delete_conversation(
    conversation_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Delete conversation.
    """
    conversation = await conversation_crud.get_conversation(db=db, conversation_id=conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if conversation.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to delete this conversation")
    
    success = await conversation_crud.delete_conversation(db=db, conversation_id=conversation_id)
    return {"success": success}


@router.post("/{conversation_id}/messages", response_model=dict)
async def create_message(
    *,
    conversation_id: str,
    message: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Add message to conversation.
    """
    # TODO: Implement message creation
    return {"id": "msg-id", "content": message, "created_at": "2023-11-01T12:00:00Z"} 