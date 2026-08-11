from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AssessmentQuestionResponse(BaseModel):
    id: int
    category: str
    question_text: str
    order: int

    class Config:
        from_attributes = True

class AssessmentSubmission(BaseModel):
    question_id: int
    score: int

class AssessmentCreate(BaseModel):
    responses: List[AssessmentSubmission]

class AssessmentResponseItem(BaseModel):
    id: int
    created_at: datetime
    scoring_model_version: str

    class Config:
        from_attributes = True
