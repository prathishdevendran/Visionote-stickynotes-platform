"""
Note Schemas Module.

Defines Pydantic models for validation, parsing, and documentation 
of Sticky Note request bodies and response payloads.
"""

from pydantic import BaseModel
from typing import List, Optional

class NoteBase(BaseModel):
    """Base schema containing standard properties of a sticky note."""
    title: str = "Draft Note"
    content: str = ""
    color: str = "amber"
    tags: List[str] = []
    isPinned: bool = False
    
class NoteCreate(NoteBase):
    """Schema for validating note creation requests; requires the note owner ID."""
    userId: str

class NoteUpdate(BaseModel):
    """Schema for validating note update requests; all parameters are optional to support PATCH operations."""
    title: Optional[str] = None
    content: Optional[str] = None
    color: Optional[str] = None
    tags: Optional[List[str]] = None
    isPinned: Optional[bool] = None

class NoteResponse(NoteBase):
    """Schema representing the serialized note returned to the frontend."""
    id: str
    userId: str
    updatedAt: str
