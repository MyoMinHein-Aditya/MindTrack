from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.core import User
from app.models.support import Intervention, InterventionAssignment, InterventionStatus
from app.schemas.support import InterventionResponse, InterventionAssignRequest, InterventionAssignmentResponse, InterventionFeedbackUpdate

router = APIRouter()

@router.get("/", response_model=List[InterventionResponse])
def get_available_interventions(db: Session = Depends(deps.get_db), current_user: User = Depends(deps.get_current_active_counselor)):
    """List all available interventions to assign."""
    return db.query(Intervention).filter(Intervention.is_active == True).all()

@router.post("/assign", response_model=InterventionAssignmentResponse)
def assign_intervention(
    req: InterventionAssignRequest,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_counselor)
):
    """Assign an intervention to a student."""
    counselor_id = current_user.counselor_profile.id
    
    assignment = InterventionAssignment(
        student_id=req.student_id,
        counselor_id=counselor_id,
        intervention_id=req.intervention_id,
        due_date=req.due_date
    )
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment

@router.put("/{assignment_id}", response_model=InterventionAssignmentResponse)
def update_intervention(
    assignment_id: int,
    req: InterventionFeedbackUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """Update intervention status/feedback (by student or counselor)."""
    assignment = db.query(InterventionAssignment).filter(InterventionAssignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Intervention assignment not found")
        
    assignment.status = req.status
    if req.student_feedback:
        assignment.student_feedback = req.student_feedback
    if req.outcome_notes and current_user.role == "COUNSELOR":
        assignment.outcome_notes = req.outcome_notes
        
    db.commit()
    db.refresh(assignment)
    return assignment
