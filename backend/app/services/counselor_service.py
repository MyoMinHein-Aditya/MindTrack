from sqlalchemy.orm import Session
from app.models.risk_event import RiskEvent
from fastapi import HTTPException
from datetime import datetime, timezone
from typing import List

class CounselorService:
    def get_unresolved_events(self, db: Session) -> List[RiskEvent]:
        return db.query(RiskEvent).filter(RiskEvent.resolved == False).order_by(RiskEvent.created_at.desc()).all()

    def resolve_event(self, db: Session, event_id: int) -> RiskEvent:
        event = db.query(RiskEvent).filter(RiskEvent.id == event_id).first()
        if not event:
            raise HTTPException(status_code=404, detail="Risk event not found")
            
        event.resolved = True
        event.resolved_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(event)
        return event

counselor_service = CounselorService()
