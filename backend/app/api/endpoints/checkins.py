from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.checkin import CheckIn
from app.models.core import User, Student
from app.schemas.checkin import CheckInCreate, CheckInResponse
from app.api.deps import get_current_user
from app.services.student_service import student_service

router = APIRouter()

@router.post("/", response_model=CheckInResponse)
def create_checkin(
    checkin: CheckInCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "STUDENT":
        raise HTTPException(status_code=403, detail="Only students can submit check-ins")
    
    student = student_service.get_student_by_user_id(db, current_user.id)
    return student_service.process_checkin(db, student.id, checkin)

@router.get("/me", response_model=List[CheckInResponse])
def get_my_checkins(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "STUDENT":
        raise HTTPException(status_code=403, detail="Only students can view their check-ins")
        
    student = student_service.get_student_by_user_id(db, current_user.id)
    return student_service.get_student_checkins(db, student.id)
