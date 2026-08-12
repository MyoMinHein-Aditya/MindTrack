from sqlalchemy.orm import Session
from app.models.assessment import Assessment, WellbeingScore
from app.models.support import Alert, AlertPriority, AlertStatus

def analyze_trends(db: Session, student_id: int):
    """
    Longitudinal Trend Engine.
    Detects meaningful changes and generates alerts based on transparent rules.
    """
    # Fetch recent assessments (e.g. last 4)
    recent = db.query(Assessment).join(WellbeingScore).filter(
        Assessment.student_id == student_id
    ).order_by(Assessment.created_at.desc()).limit(4).all()

    if len(recent) < 2:
        return # Not enough data for a trend

    latest = recent[0].wellbeing_score.total_score
    previous = recent[1].wellbeing_score.total_score

    change = latest - previous
    
    alert_created = False

    # PRIORITY REVIEW: Sudden massive drop
    if change <= -20 or latest < 35:
        create_alert(db, student_id, AlertPriority.PRIORITY, f"Sudden significant drop of {abs(change):.1f} points.")
        alert_created = True

    # FOLLOW-UP RECOMMENDED: 3 consecutive declines
    elif len(recent) >= 4:
        prev2 = recent[2].wellbeing_score.total_score
        prev3 = recent[3].wellbeing_score.total_score
        
        # 3 declines: prev3 -> prev2 -> previous -> latest
        if latest < previous and previous < prev2 and prev2 < prev3:
            total_drop = prev3 - latest
            if total_drop >= 10:  # Threshold
                create_alert(db, student_id, AlertPriority.FOLLOW_UP, "Sustained change across recent check-ins.")
                alert_created = True

    # OBSERVATION (Small change, Optional)
    elif change <= -12 and not alert_created:
        create_alert(db, student_id, AlertPriority.OBSERVATION, "Recent check-in was notably lower than previous.")
        
    db.commit()

def create_alert(db: Session, student_id: int, priority: AlertPriority, reason: str):
    # Check if there is already an open alert of this priority to avoid spam
    existing = db.query(Alert).filter(
        Alert.student_id == student_id,
        Alert.status == AlertStatus.OPEN,
        Alert.priority == priority
    ).first()
    
    if not existing:
        new_alert = Alert(
            student_id=student_id,
            priority=priority,
            reason=reason
        )
        db.add(new_alert)
