from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class DocumentBase(BaseModel):
    """Base schema for document"""
    filename: str = Field(..., description="Original filename of the document")
    content_type: str = Field(..., description="MIME type of the document")
    size: int = Field(..., description="Size of the document in bytes")


class DocumentCreate(DocumentBase):
    """Schema for creating a new document - used internally"""
    storage_path: str = Field(..., description="Path to the stored document")
    content_text: Optional[str] = Field(None, description="Extracted text content if available")


class DocumentInDBBase(DocumentBase):
    """Base schema for document in DB"""
    id: str
    user_id: str
    storage_path: str
    is_processed: bool
    content_text: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True


class Document(DocumentInDBBase):
    """Schema for document"""
    pass


class DocumentResponse(DocumentBase):
    """Schema for document response that excludes sensitive fields"""
    id: str
    is_processed: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True 