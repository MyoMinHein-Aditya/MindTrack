from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.models.support import AlertPriority, AlertStatus, InterventionStatus

# --- ALERTS ---

class StudentUserResponse(BaseModel):
    first_name: str
    last_name: str

    class Config:
        from_attributes = True

class AlertStudentResponse(BaseModel):
    user: StudentUserResponse

    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: int
    student_id: int
    priority: AlertPriority
    status: AlertStatus
    reason: str
    created_at: datetime
    resolved_at: Optional[datetime]
    student: Optional[AlertStudentResponse] = None

    class Config:
        from_attributes = True

class AlertUpdate(BaseModel):
    status: AlertStatus

# --- INTERVENTIONS ---

class InterventionResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str

    class Config:
        from_attributes = True

class InterventionAssignRequest(BaseModel):
    student_id: int
    intervention_id: int
    due_date: Optional[datetime] = None

class InterventionAssignmentResponse(BaseModel):
    id: int
    student_id: int
    intervention_id: int
    status: InterventionStatus
    assigned_date: datetime
    due_date: Optional[datetime]

    class Config:
        from_attributes = True

class InterventionFeedbackUpdate(BaseModel):
    status: InterventionStatus
    student_feedback: Optional[str] = None
    outcome_notes: Optional[str] = None
