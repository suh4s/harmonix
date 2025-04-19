import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Boolean
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Document(Base):
    """Model for storing uploaded documents"""
    __tablename__ = "documents"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    filename = Column(String, nullable=False)
    content_type = Column(String, nullable=False)
    size = Column(Integer, nullable=False)
    storage_path = Column(String, nullable=False)  # Path to file in S3 or local storage
    content_text = Column(String, nullable=True)  # Extracted text content if available
    is_processed = Column(Boolean, default=False)  # Flag to indicate if document has been processed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="documents")
    
    def __repr__(self) -> str:
        return f"<Document {self.id}: {self.filename}>" 