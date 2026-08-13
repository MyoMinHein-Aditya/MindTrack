from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class DynamicQuestionResponse(BaseModel):
    id: int
    question_text: str
    order: int

    class Config:
        from_attributes = True

class ActiveAssessmentResponse(BaseModel):
    id: int
    created_at: datetime
    questions: List[DynamicQuestionResponse]

    class Config:
        from_attributes = True

class AssessmentSubmission(BaseModel):
    question_id: int
    score: int # 1 to 5

class AssessmentSubmitRequest(BaseModel):
    responses: List[AssessmentSubmission]

class AssessmentReportResponse(BaseModel):
    category: int
    report: str

    class Config:
        from_attributes = True
