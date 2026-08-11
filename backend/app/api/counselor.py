from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime, timezone, timedelta

from app.api import deps
from app.models.core import User, Student
from app.models.support import Alert, AlertStatus, InterventionAssignment
from app.models.assessment import Assessment
from app.schemas.support import AlertResponse, AlertUpdate

router = APIRouter()

@router.get("/dashboard-stats")
def get_dashboard_stats(db: Session = Depends(deps.get_db), current_user: User = Depends(deps.get_current_active_counselor)):
    """Get high-level stats for the counselor dashboard."""
    # In a real app, scope to school_id
    school_id = current_user.school_id
    
    # Students monitored (Total students in school)
    total_students = db.query(Student).join(User).filter(User.school_id == school_id).count()
    
    # Active alerts
    active_alerts = db.query(Alert).join(Student).join(User).filter(
        User.school_id == school_id,
        Alert.status == AlertStatus.OPEN
    ).count()
    
    # Active interventions
    active_interventions = db.query(InterventionAssignment).join(Student).join(User).filter(
        User.school_id == school_id,
        InterventionAssignment.status == "In Progress"
    ).count()

    # Check-ins this week
    one_week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    checkins_this_week = db.query(Assessment).join(Student).join(User).filter(
        User.school_id == school_id,
        Assessment.created_at >= one_week_ago
    ).count()
    
    return {
        "students_monitored": total_students,
        "active_alerts": active_alerts,
        "active_interventions": active_interventions,
        "checkins_this_week": checkins_this_week
    }

@router.get("/alerts", response_model=List[AlertResponse])
def get_alerts(db: Session = Depends(deps.get_db), current_user: User = Depends(deps.get_current_active_counselor)):
    """Get alerts for the counselor's school."""
    school_id = current_user.school_id
    alerts = db.query(Alert).join(Student).join(User).filter(
        User.school_id == school_id,
        Alert.status != AlertStatus.CLOSED
    ).order_by(Alert.created_at.desc()).all()
    return alerts

@router.put("/alerts/{alert_id}", response_model=AlertResponse)
def update_alert(
    alert_id: int,
    alert_in: AlertUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_counselor)
):
    """Update alert status (e.g. mark as closed)."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
        
    # Verify alert belongs to same school
    student = db.query(Student).filter(Student.id == alert.student_id).first()
    if student.user.school_id != current_user.school_id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    alert.status = alert_in.status
    if alert.status == AlertStatus.CLOSED:
        alert.resolved_at = datetime.now(timezone.utc)
        alert.resolved_by_id = current_user.counselor_profile.id
        
    db.commit()
    db.refresh(alert)
    return alert
