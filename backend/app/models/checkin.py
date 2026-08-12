from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class CheckIn(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    mood = Column(Integer, nullable=False) # e.g., 1-5 scale
    stress = Column(Integer, nullable=False) # e.g., 1-5 scale
    sleep = Column(Integer, nullable=False) # e.g., 1-5 scale
    concern = Column(String, nullable=True) # A specific area of concern
    free_text = Column(Text, nullable=True) # Optional text
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student")
