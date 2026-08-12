from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timezone
from app.api.deps import get_db, get_current_user
from app.models.core import User, Student
from app.models.risk_event import RiskEvent
from app.schemas.risk_event import RiskEventResponse

router = APIRouter()

@router.get("/risk-events", response_model=List[RiskEventResponse])
def get_risk_events(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.value not in ["COUNSELOR", "ADMIN"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Return active risk events (unresolved)
    events = db.query(RiskEvent).filter(RiskEvent.resolved == False).order_by(RiskEvent.created_at.desc()).all()
    return events

@router.post("/risk-events/{event_id}/resolve", response_model=RiskEventResponse)
def resolve_risk_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role.value not in ["COUNSELOR", "ADMIN"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    event = db.query(RiskEvent).filter(RiskEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Risk event not found")
        
    event.resolved = True
    event.resolved_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(event)
    return event
