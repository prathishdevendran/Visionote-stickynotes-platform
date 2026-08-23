"""
Notes Router Module.

Exposes REST endpoints for Sticky Note CRUD operations (Create, Read, Update, Delete)
and handles serialization between MongoDB documents and Pydantic models.
"""

from fastapi import APIRouter, HTTPException, Query
from app.schemas import NoteCreate, NoteUpdate, NoteResponse
from app.database import notes_collection
from bson import ObjectId
from bson.errors import InvalidId
from datetime import datetime
from typing import List

# Configure notes router routes
router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)

def serialize_note(note) -> dict:
    """
    Helper utility to serialize MongoDB database documents into Pydantic-compatible dicts.
    Converts MongoDB BSON ObjectId instance to standard Python string representations.
    """
    return {
        "id": str(note["_id"]),
        "title": note.get("title", "Draft Note"),
        "content": note.get("content", ""),
        "color": note.get("color", "amber"),
        "tags": note.get("tags", []),
        "isPinned": note.get("isPinned", False),
        "userId": note.get("userId", ""),
        "updatedAt": note.get("updatedAt", "")
    }

@router.post("", response_model=NoteResponse, status_code=201)
def create_note(note: NoteCreate):
    """
    Create a new sticky note.
    Generates a localized modification timestamp, saves details to MongoDB, and returns the serialized note.
    """
    # Convert Pydantic object to database-ready dict
    note_dict = note.model_dump()
    
    # Store dynamic human-readable timestamp matching the frontend UI styling
    note_dict["updatedAt"] = datetime.now().strftime("%b %d, %Y, %I:%M %p")
    
    # Persist in MongoDB
    result = notes_collection.insert_one(note_dict)
    
    created_note = notes_collection.find_one({"_id": result.inserted_id})
    if not created_note:
        raise HTTPException(status_code=500, detail="Failed to retrieve note after creation")
        
    return serialize_note(created_note)

@router.get("", response_model=List[NoteResponse])
def get_notes(userId: str = Query(..., description="The ID of the user whose notes are to be retrieved")):
    """
    Retrieve all sticky notes for a user.
    Loads documents filtering by owner ID, sorting pinned items to the top, followed by modification time.
    """
    notes_cursor = notes_collection.find({"userId": userId})
    notes = list(notes_cursor)
    
    # Primary sort: isPinned (True values first / ascending boolean negation math)
    # Secondary sort: updatedAt timestamp string value
    notes.sort(key=lambda n: (not n.get("isPinned", False), n.get("updatedAt", "")))
    return [serialize_note(n) for n in notes]

@router.get("/{note_id}", response_model=NoteResponse)
def get_note(note_id: str):
    """
    Retrieve details of a single sticky note by its ID.
    Performs ObjectId format validation and resource existence checks.
    """
    try:
        obj_id = ObjectId(note_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid note ID format")
        
    note = notes_collection.find_one({"_id": obj_id})
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
        
    return serialize_note(note)

@router.put("/{note_id}", response_model=NoteResponse)
def update_note(note_id: str, note_update: NoteUpdate):
    """
    Modify fields of an existing note.
    Validates note existence, filters out unchanged null properties, updates fields in MongoDB, and refreshes the timestamp.
    """
    try:
        obj_id = ObjectId(note_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid note ID format")
        
    # Verify the note is present in the database
    existing_note = notes_collection.find_one({"_id": obj_id})
    if not existing_note:
        raise HTTPException(status_code=404, detail="Note not found")
        
    # Extract only fields that the request body wishes to update
    update_data = {k: v for k, v in note_update.model_dump().items() if v is not None}
    if update_data:
        update_data["updatedAt"] = datetime.now().strftime("%b %d, %Y, %I:%M %p")
        notes_collection.update_one(
            {"_id": obj_id},
            {"$set": update_data}
        )
        
    updated_note = notes_collection.find_one({"_id": obj_id})
    return serialize_note(updated_note)

@router.delete("/{note_id}")
def delete_note(note_id: str):
    """
    Delete a sticky note resource.
    Validates resource existence, deletes it from MongoDB, and returns confirmation.
    """
    try:
        obj_id = ObjectId(note_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid note ID format")
        
    # Check if resource is valid
    existing_note = notes_collection.find_one({"_id": obj_id})
    if not existing_note:
        raise HTTPException(status_code=404, detail="Note not found")
        
    notes_collection.delete_one({"_id": obj_id})
    return {"message": "Note deleted successfully"}
