from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.checkin import CheckIn
from app.models.core import User, Student
from app.schemas.checkin import CheckInCreate, CheckInResponse
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=CheckInResponse)
def create_checkin(
    checkin: CheckInCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "STUDENT":
        raise HTTPException(status_code=403, detail="Only students can submit check-ins")
    
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    new_checkin = CheckIn(
        student_id=student.id,
        mood=checkin.mood,
        stress=checkin.stress,
        sleep=checkin.sleep,
        concern=checkin.concern,
        free_text=checkin.free_text
    )
    
    db.add(new_checkin)
    
    # Gamification: Update streak and points
    if student.streak_count is None:
        student.streak_count = 0
    if student.points is None:
        student.points = 0
        
    student.streak_count += 1
    student.points += 10 # 10 points per check-in
    
    db.commit()
    db.refresh(new_checkin)
    
    return new_checkin

@router.get("/me", response_model=List[CheckInResponse])
def get_my_checkins(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "STUDENT":
        raise HTTPException(status_code=403, detail="Only students can view their check-ins")
        
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    checkins = db.query(CheckIn).filter(CheckIn.student_id == student.id).order_by(CheckIn.created_at.asc()).all()
    return checkins
