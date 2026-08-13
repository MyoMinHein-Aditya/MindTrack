from typing import List
from sqlalchemy.orm import Session
from app.crud.base import BaseRepository
from app.models.checkin import Checkin
from app.schemas.checkin import CheckinCreate, CheckinUpdate

class CheckinRepository(BaseRepository[Checkin, CheckinCreate, CheckinUpdate]):
    def get_by_student(self, db: Session, *, student_id: int, skip: int = 0, limit: int = 100) -> List[Checkin]:
        return db.query(Checkin).filter(Checkin.student_id == student_id).order_by(Checkin.created_at.desc()).offset(skip).limit(limit).all()

checkin_repo = CheckinRepository(Checkin)
