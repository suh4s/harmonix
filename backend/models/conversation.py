import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from sqlalchemy import Column, String, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Conversation(Base):
    """Model for storing consultation conversations"""
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("user.id"))
    title = Column(String, nullable=False)  # Generated from input if not provided
    input = Column(String, nullable=False)
    context = Column(JSON, nullable=True)  # Additional context for the consultation
    all_responses = Column(JSON, nullable=True)  # Responses from each personality
    summary = Column(String, nullable=True)  # Summary of all responses
    status = Column(String, default="in_progress")  # in_progress, completed, error
    personalities = Column(JSON, nullable=False)  # List of personality IDs used
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with User model
    user = relationship("User", back_populates="conversations")
    
    def __repr__(self) -> str:
        return f"<Conversation {self.id}: {self.title}>" 