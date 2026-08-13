from sqlalchemy.orm import Session
from app.models.core import Student
from app.models.checkin import CheckIn
from app.schemas.checkin import CheckInCreate
from fastapi import HTTPException

class StudentService:
    def get_student_by_user_id(self, db: Session, user_id: int) -> Student:
        student = db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        return student

    def process_checkin(self, db: Session, student_id: int, checkin_data: CheckInCreate) -> CheckIn:
        new_checkin = CheckIn(
            student_id=student_id,
            mood=checkin_data.mood,
            stress=checkin_data.stress,
            sleep=checkin_data.sleep,
            concern=checkin_data.concern,
            free_text=checkin_data.free_text
        )
        db.add(new_checkin)
        
        # Gamification
        student = db.query(Student).filter(Student.id == student_id).first()
        if student:
            if student.streak_count is None:
                student.streak_count = 0
            if student.points is None:
                student.points = 0
            student.streak_count += 1
            student.points += 10
            
        db.commit()
        db.refresh(new_checkin)
        return new_checkin

    def get_student_checkins(self, db: Session, student_id: int) -> list[CheckIn]:
        return db.query(CheckIn).filter(CheckIn.student_id == student_id).order_by(CheckIn.created_at.asc()).all()

student_service = StudentService()
