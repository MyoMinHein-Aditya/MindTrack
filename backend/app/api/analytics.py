from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, Any

from app.api import deps
from app.models.core import User, Student
from app.models.assessment import Assessment, WellbeingScore
from app.models.support import InterventionAssignment, InterventionStatus

router = APIRouter()

@router.get("/outcome/{assignment_id}")
def get_intervention_outcome(
    assignment_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_counselor)
):
    """Compare wellbeing scores before and after an intervention."""
    assignment = db.query(InterventionAssignment).filter(InterventionAssignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
        
    student_id = assignment.student_id
    assigned_date = assignment.assigned_date
    
    # Get last assessment BEFORE intervention
    before_assessment = db.query(Assessment).filter(
        Assessment.student_id == student_id,
        Assessment.created_at < assigned_date
    ).order_by(Assessment.created_at.desc()).first()
    
    # Get first assessment AFTER intervention
    after_assessment = db.query(Assessment).filter(
        Assessment.student_id == student_id,
        Assessment.created_at > assigned_date
    ).order_by(Assessment.created_at.asc()).first()
    
    before_score = before_assessment.wellbeing_score.total_score if before_assessment and before_assessment.wellbeing_score else None
    after_score = after_assessment.wellbeing_score.total_score if after_assessment and after_assessment.wellbeing_score else None
    
    change = None
    if before_score is not None and after_score is not None:
        change = after_score - before_score
        
    return {
        "assignment_id": assignment_id,
        "before_score": before_score,
        "after_score": after_score,
        "change": change
    }

@router.get("/school")
def get_school_analytics(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_admin)
):
    """Aggregate analytics for administrators (privacy-preserving)."""
    school_id = current_user.school_id
    
    # Counts for setup progress
    counselor_count = db.query(User).filter(User.school_id == school_id, User.role == "COUNSELOR").count()
    teacher_count = db.query(User).filter(User.school_id == school_id, User.role == "TEACHER").count()
    student_count = db.query(User).filter(User.school_id == school_id, User.role == "STUDENT").count()

    # Participation
    # Students who have at least 1 check-in
    participating_students = db.query(Student.id).join(Assessment).join(User).filter(
        User.school_id == school_id
    ).distinct().count()

    participation_rate = 0
    if student_count > 0:
        participation_rate = round((participating_students / student_count) * 100)

    # Average wellbeing score across school
    avg_score = db.query(func.avg(WellbeingScore.total_score)).join(Assessment).join(Student).join(User).filter(
        User.school_id == school_id
    ).scalar()
    
    # Total interventions completed
    interventions_completed = db.query(InterventionAssignment).join(Student).join(User).filter(
        User.school_id == school_id,
        InterventionAssignment.status == InterventionStatus.COMPLETED
    ).count()
    
    # Most reported factor (simplified: find factor with most negative score changes across school)
    # Since factor analysis isn't fully robust in this prototype yet, we can mock it based on raw data or leave empty if zero
    
    thriving = db.query(WellbeingScore).join(Assessment).join(Student).join(User).filter(
        User.school_id == school_id, WellbeingScore.category_label == "Thriving"
    ).count()
    
    needs_attention = db.query(WellbeingScore).join(Assessment).join(Student).join(User).filter(
        User.school_id == school_id, WellbeingScore.category_label == "Needs attention"
    ).count()

    return {
        "setup_progress": {
            "counselors": counselor_count,
            "teachers": teacher_count,
            "students": student_count
        },
        "participation": {
            "participating_students": participating_students,
            "total_students": student_count,
            "rate": participation_rate
        },
        "average_wellbeing_score": round(avg_score, 1) if avg_score else None,
        "interventions_completed": interventions_completed,
        "distribution": {
            "Thriving": thriving,
            "Needs attention": needs_attention
        }
    }
