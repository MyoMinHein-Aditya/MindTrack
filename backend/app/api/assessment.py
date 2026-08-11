from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.core import User
from app.models.assessment import AssessmentQuestion, Assessment, AssessmentResponse
from app.schemas.assessment import AssessmentQuestionResponse, AssessmentCreate, AssessmentResponseItem
from app.services.scoring import calculate_and_store_wellbeing

router = APIRouter()

@router.get("/questions", response_model=List[AssessmentQuestionResponse])
def get_assessment_questions(db: Session = Depends(deps.get_db), current_user: User = Depends(deps.get_current_active_student)):
    """Fetch active assessment questions for a student check-in."""
    questions = db.query(AssessmentQuestion).filter(AssessmentQuestion.is_active == True).order_by(AssessmentQuestion.order).all()
    return questions

@router.post("/submit", response_model=AssessmentResponseItem)
def submit_assessment(
    submission: AssessmentCreate, 
    db: Session = Depends(deps.get_db), 
    current_user: User = Depends(deps.get_current_active_student)
):
    """Submit a new assessment and calculate the wellbeing score."""
    if not current_user.student_profile:
        raise HTTPException(status_code=400, detail="Student profile not found")
        
    student_id = current_user.student_profile.id
    
    # 1. Create Assessment Record
    new_assessment = Assessment(
        student_id=student_id,
        scoring_model_version="v1.0"
    )
    db.add(new_assessment)
    db.flush() # get ID

    # 2. Store Responses
    for resp in submission.responses:
        ar = AssessmentResponse(
            assessment_id=new_assessment.id,
            question_id=resp.question_id,
            score=resp.score
        )
        db.add(ar)
    
    db.flush()
    
    # 3. Calculate and Store Wellbeing Score & Factors
    calculate_and_store_wellbeing(db, new_assessment.id, student_id)
    
    db.commit()
    db.refresh(new_assessment)
    
    # 4. Trigger Trend Analysis Async (or sync for MVP)
    from app.services.trend import analyze_trends
    analyze_trends(db, student_id)
    
    return new_assessment

@router.get("/history/{student_id}", response_model=List[AssessmentResponseItem])
def get_assessment_history(
    student_id: int, 
    db: Session = Depends(deps.get_db), 
    current_user: User = Depends(deps.get_current_user)
):
    """Get history. Counselors can view assigned students. Students can only view themselves."""
    if current_user.role == "STUDENT" and current_user.student_profile.id != student_id:
         raise HTTPException(status_code=403, detail="Not authorized to view this data")
    
    # In a real app, add check here to ensure counselor is authorized for this specific student's school
    
    history = db.query(Assessment).filter(Assessment.student_id == student_id).order_by(Assessment.created_at.desc()).all()
    return history
