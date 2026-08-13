from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.database import Base

class RoleEnum(str, enum.Enum):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"
    COUNSELOR = "COUNSELOR"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    school_id = Column(Integer, ForeignKey("schools.id"), nullable=True)

    school = relationship("School", back_populates="users")
    student_profile = relationship("Student", back_populates="user", uselist=False)
    teacher_profile = relationship("Teacher", back_populates="user", uselist=False)
    counselor_profile = relationship("Counselor", back_populates="user", uselist=False)

class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    users = relationship("User", back_populates="school")
    classes = relationship("Class", back_populates="school")

class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    school_id = Column(Integer, ForeignKey("schools.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    school = relationship("School", back_populates="classes")
    students = relationship("Student", back_populates="school_class")

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    class_id = Column(Integer, ForeignKey("classes.id"))
    consent_given = Column(Boolean, default=False)
    streak_count = Column(Integer, default=0)
    points = Column(Integer, default=0)
    
    # New Fields for Assessment & Segregation
    assigned_counselor_id = Column(Integer, ForeignKey("counselors.id"), nullable=True)
    risk_category = Column(Integer, default=1) # 1=No Counseling, 2=Needs Attention (Weekly), 3=Severe (Doctor)
    parent_email = Column(String, nullable=True)
    parent_phone = Column(String, nullable=True)
    assessment_frequency = Column(String, default="MONTHLY") # MONTHLY or WEEKLY
    next_assessment_date = Column(DateTime(timezone=True), nullable=True)
    
    user = relationship("User", back_populates="student_profile")
    assigned_counselor = relationship("Counselor", back_populates="students")
    school_class = relationship("Class", back_populates="students")
    assessments = relationship("Assessment", back_populates="student")
    alerts = relationship("Alert", back_populates="student")
    interventions = relationship("InterventionAssignment", back_populates="student")
    risk_events = relationship("RiskEvent", back_populates="student", cascade="all, delete-orphan")

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    user = relationship("User", back_populates="teacher_profile")

class Counselor(Base):
    __tablename__ = "counselors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    user = relationship("User", back_populates="counselor_profile")
    students = relationship("Student", back_populates="assigned_counselor")
