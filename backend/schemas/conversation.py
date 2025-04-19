from typing import Dict, List, Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field


class ConversationBase(BaseModel):
    """Base schema for conversation"""
    input: str = Field(..., description="User input text for the consultation")
    title: Optional[str] = Field(None, description="Title for the conversation")


class ConversationCreate(ConversationBase):
    """Schema for creating a new conversation"""
    personality_ids: List[str] = Field(..., description="List of personality IDs to use for the consultation")
    context: Optional[Dict[str, Any]] = Field(None, description="Additional context for the consultation")


class ConversationUpdate(BaseModel):
    """Schema for updating an existing conversation"""
    title: Optional[str] = None


class ConversationInDBBase(ConversationBase):
    """Base schema for conversation in DB"""
    id: str
    user_id: str
    title: str
    personalities: List[str]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True


class Conversation(ConversationInDBBase):
    """Schema for a basic conversation"""
    pass


class ConversationResponse(ConversationInDBBase):
    """Schema for a complete conversation with responses"""
    all_responses: Optional[Dict[str, str]] = None
    summary: Optional[str] = None
    context: Optional[Dict[str, Any]] = None 