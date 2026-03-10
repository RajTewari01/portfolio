from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime, timezone
from app.models.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.core.security import get_current_user
from app.services.firebase import get_db

router = APIRouter()
db = get_db()
PROJECTS_COLLECTION = "projects"

@router.get("/", response_model=List[ProjectResponse])
def get_all_projects(featured_only: bool = False):
    """Retrieve all projects. Can filter by featured."""
    projects_ref = db.collection(PROJECTS_COLLECTION)
    if featured_only:
        projects_ref = projects_ref.where("featured", "==", True)
    
    docs = projects_ref.stream()
    
    projects = []
    for doc in docs:
        project_data = doc.to_dict()
        project_data["id"] = doc.id
        projects.append(project_data)
        
    # Sort by created_at descending (newest first)
    projects.sort(key=lambda x: x.get("created_at", datetime.min.astimezone(timezone.utc)), reverse=True)
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str):
    """Retrieve a single project by ID."""
    doc_ref = db.collection(PROJECTS_COLLECTION).document(project_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Project not found")
        
    project_data = doc.to_dict()
    project_data["id"] = doc.id
    return project_data

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, current_user: dict = Depends(get_current_user)):
    """Create a new project. Requires authentication."""
    # current_user could be checked to ensure it's the admin
    
    now = datetime.now(timezone.utc)
    project_data = project.model_dump()
    project_data["created_at"] = now
    project_data["updated_at"] = now
    
    # Add to Firestore
    doc_ref = db.collection(PROJECTS_COLLECTION).document()
    doc_ref.set(project_data)
    
    project_data["id"] = doc_ref.id
    return project_data

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, project_update: ProjectUpdate, current_user: dict = Depends(get_current_user)):
    """Update a project. Requires authentication."""
    doc_ref = db.collection(PROJECTS_COLLECTION).document(project_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Project not found")
        
    update_data = project_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.now(timezone.utc)
    
    doc_ref.update(update_data)
    
    # Fetch updated
    updated_doc = doc_ref.get()
    updated_data = updated_doc.to_dict()
    updated_data["id"] = updated_doc.id
    return updated_data

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a project. Requires authentication."""
    doc_ref = db.collection(PROJECTS_COLLECTION).document(project_id)
    doc = doc_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Project not found")
        
    doc_ref.delete()
    return None
