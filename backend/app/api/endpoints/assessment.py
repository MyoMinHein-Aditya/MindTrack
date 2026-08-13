from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.core import User, Student
from app.schemas.assessment import ActiveAssessmentResponse, AssessmentSubmitRequest, AssessmentReportResponse
from app.services.assessment_service import assessment_service
from app.services.notification_service import notification_service
from app.services.student_service import student_service

router = APIRouter()

@router.get("/active", response_model=ActiveAssessmentResponse)
def get_active_assessment(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.value != "STUDENT":
        raise HTTPException(status_code=403, detail="Only students can take assessments.")
    
    student = student_service.get_student_by_user_id(db, current_user.id)
    
    # This will either fetch an incomplete one or generate a new one via Groq
    assessment = assessment_service.generate_assessment(db, student.id)
    
    return {
        "id": assessment.id,
        "created_at": assessment.created_at,
        "questions": assessment.dynamic_questions
    }

@router.post("/submit", response_model=AssessmentReportResponse)
def submit_assessment(
    request: AssessmentSubmitRequest,
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.value != "STUDENT":
        raise HTTPException(status_code=403, detail="Only students can submit assessments.")
    
    student = student_service.get_student_by_user_id(db, current_user.id)
    
    responses = [resp.dict() for resp in request.responses]
    
    # Evaluate using Groq
    assessment = assessment_service.evaluate_and_segregate(db, assessment_id, responses)
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
        
    # Send mock notifications
    notification_service.send_report_to_parent(student, assessment)
    notification_service.notify_counselor(student, assessment)
    
    return {
        "category": assessment.assigned_category,
        "report": assessment.report_text
    }
