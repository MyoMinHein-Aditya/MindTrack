from typing import List
from sqlalchemy.orm import Session
from app.crud.base import BaseRepository
from app.models.risk_event import RiskEvent
from pydantic import BaseModel

class RiskEventUpdate(BaseModel):
    is_resolved: bool

class RiskEventCreate(BaseModel):
    student_id: int
    risk_level: str
    description: str

class RiskEventRepository(BaseRepository[RiskEvent, RiskEventCreate, RiskEventUpdate]):
    def get_unresolved_by_school(self, db: Session, *, school_id: int) -> List[RiskEvent]:
        # Filter risk events by student's school_id
        from app.models.core import Student, User
        return db.query(RiskEvent).join(Student).join(User).filter(
            User.school_id == school_id,
            RiskEvent.is_resolved == False
        ).order_by(
            RiskEvent.created_at.desc()
        ).all()

risk_event_repo = RiskEventRepository(RiskEvent)
