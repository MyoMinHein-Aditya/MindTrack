from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CheckInBase(BaseModel):
    mood: int
    stress: int
    sleep: int
    concern: Optional[str] = None
    free_text: Optional[str] = None

class CheckInCreate(CheckInBase):
    pass

class CheckInResponse(CheckInBase):
    id: int
    student_id: int
    created_at: datetime

    class Config:
        from_attributes = True
