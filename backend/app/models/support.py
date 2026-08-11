from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.database import Base

class AlertPriority(str, enum.Enum):
    OBSERVATION = "OBSERVATION"
    FOLLOW_UP = "FOLLOW_UP RECOMMENDED"
    PRIORITY = "PRIORITY REVIEW"
    SAFETY = "SAFETY CONCERN"

class AlertStatus(str, enum.Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    CLOSED = "CLOSED"

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    priority = Column(Enum(AlertPriority), nullable=False)
    status = Column(Enum(AlertStatus), default=AlertStatus.OPEN)
    reason = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    resolved_by_id = Column(Integer, ForeignKey("counselors.id"), nullable=True)

    student = relationship("Student", back_populates="alerts")
    resolved_by = relationship("Counselor")

class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

class InterventionStatus(str, enum.Enum):
    ASSIGNED = "Assigned"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    REVIEWED = "Reviewed"

class InterventionAssignment(Base):
    __tablename__ = "intervention_assignments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    counselor_id = Column(Integer, ForeignKey("counselors.id"), nullable=False)
    intervention_id = Column(Integer, ForeignKey("interventions.id"), nullable=False)
    status = Column(Enum(InterventionStatus), default=InterventionStatus.ASSIGNED)
    assigned_date = Column(DateTime(timezone=True), server_default=func.now())
    due_date = Column(DateTime(timezone=True), nullable=True)
    student_feedback = Column(Text, nullable=True)
    outcome_notes = Column(Text, nullable=True)

    student = relationship("Student", back_populates="interventions")
    counselor = relationship("Counselor")
    intervention = relationship("Intervention")
