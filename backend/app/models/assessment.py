from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False) # e.g. 'Mood', 'Sleep'
    question_text = Column(String, nullable=False)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    scoring_model_version = Column(String, default="v1.0")
    report_text = Column(Text, nullable=True)
    assigned_category = Column(Integer, nullable=True) # 1, 2, or 3
    is_completed = Column(Boolean, default=False)
    
    student = relationship("Student", back_populates="assessments")
    responses = relationship("AssessmentResponse", back_populates="assessment")
    wellbeing_score = relationship("WellbeingScore", back_populates="assessment", uselist=False)
    dynamic_questions = relationship("DynamicQuestion", back_populates="assessment", cascade="all, delete-orphan")

class DynamicQuestion(Base):
    __tablename__ = "dynamic_questions"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    question_text = Column(String, nullable=False)
    order = Column(Integer, default=0)

    assessment = relationship("Assessment", back_populates="dynamic_questions")

class AssessmentResponse(Base):
    __tablename__ = "assessment_responses"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False)
    dynamic_question_id = Column(Integer, ForeignKey("dynamic_questions.id"), nullable=False)
    score = Column(Integer, nullable=False) # 1-5
    
    assessment = relationship("Assessment", back_populates="responses")
    question = relationship("DynamicQuestion")

class WellbeingScore(Base):
    __tablename__ = "wellbeing_scores"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"), nullable=False, unique=True)
    total_score = Column(Float, nullable=False)
    category_label = Column(String, nullable=False) # Thriving, Stable, Needs attention, Significant concern
    
    assessment = relationship("Assessment", back_populates="wellbeing_score")
    factors = relationship("WellbeingFactor", back_populates="wellbeing_score")

class WellbeingFactor(Base):
    __tablename__ = "wellbeing_factors"

    id = Column(Integer, primary_key=True, index=True)
    wellbeing_score_id = Column(Integer, ForeignKey("wellbeing_scores.id"), nullable=False)
    category = Column(String, nullable=False)
    score_contribution = Column(Float, nullable=False)
    change_from_previous = Column(Float, nullable=True)

    wellbeing_score = relationship("WellbeingScore", back_populates="factors")
