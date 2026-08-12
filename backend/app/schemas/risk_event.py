from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RiskEventBase(BaseModel):
    student_id: int
    risk_level: str
    description: str

class RiskEventCreate(RiskEventBase):
    pass

class RiskEventResponse(RiskEventBase):
    id: int
    resolved: bool
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True
