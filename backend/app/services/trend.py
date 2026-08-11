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

    # Rule 3: PRIORITY REVIEW (Large sustained decline)
    if change <= -15 or latest < 40:
        create_alert(db, student_id, AlertPriority.PRIORITY, f"Large decline of {change:.1f} points or score in significant concern range.")
        alert_created = True

    # Rule 2: FOLLOW-UP RECOMMENDED (Multiple declining indicators / consecutive decline)
    elif len(recent) >= 3:
        prev2 = recent[2].wellbeing_score.total_score
        if latest < previous and previous < prev2:
            create_alert(db, student_id, AlertPriority.FOLLOW_UP, "Consistent decline observed across multiple recent assessments.")
            alert_created = True

    # Rule 1: OBSERVATION (Small change)
    elif change <= -8 and not alert_created:
        create_alert(db, student_id, AlertPriority.OBSERVATION, f"Small but notable decline of {change:.1f} points observed.")
        
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
