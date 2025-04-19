from typing import Any, Dict, List, Optional, Union
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.conversation import Conversation


async def get_conversation(db: AsyncSession, conversation_id: str) -> Optional[Conversation]:
    """Get a conversation by ID"""
    result = await db.execute(select(Conversation).filter(Conversation.id == conversation_id))
    return result.scalars().first()


async def get_user_conversations(
    db: AsyncSession, user_id: str, skip: int = 0, limit: int = 100
) -> List[Conversation]:
    """Get all conversations for a user"""
    result = await db.execute(
        select(Conversation)
        .filter(Conversation.user_id == user_id)
        .order_by(Conversation.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()


async def create_conversation(
    db: AsyncSession,
    user_id: str,
    input_text: str,
    personalities: List[str],
    title: Optional[str] = None,
    context: Optional[Dict[str, Any]] = None,
) -> Conversation:
    """Create a new conversation"""
    # Generate title from input if not provided
    if not title:
        if len(input_text) > 50:
            title = f"{input_text[:47]}..."
        else:
            title = input_text
            
    # Create conversation
    conversation = Conversation(
        user_id=user_id,
        title=title,
        input=input_text,
        personalities=personalities,
        context=context or {},
        status="in_progress"
    )
    
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    return conversation


async def update_conversation_responses(
    db: AsyncSession,
    conversation_id: str,
    all_responses: Dict[str, str],
    summary: Optional[str] = None,
    status: str = "completed"
) -> Optional[Conversation]:
    """Update a conversation with AI responses"""
    conversation = await get_conversation(db, conversation_id)
    if not conversation:
        return None
        
    conversation.all_responses = all_responses
    conversation.summary = summary
    conversation.status = status
    conversation.updated_at = datetime.utcnow()
    
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    return conversation


async def delete_conversation(db: AsyncSession, conversation_id: str) -> bool:
    """Delete a conversation"""
    conversation = await get_conversation(db, conversation_id)
    if not conversation:
        return False
        
    await db.delete(conversation)
    await db.commit()
    return True 