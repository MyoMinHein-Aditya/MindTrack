import asyncio
import os
import sys

# Add backend to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine, Base
from app.models.core import User, School, RoleEnum, Student, Counselor
from app.core.security import get_password_hash

def seed_demo_users():
    db: Session = SessionLocal()
    
    try:
        # Create a Demo School if it doesn't exist
        school = db.query(School).filter(School.name == "Demo High School").first()
        if not school:
            school = School(name="Demo High School", address="123 Education Lane")
            db.add(school)
            db.commit()
            db.refresh(school)
            print(f"Created school: {school.name}")
            
        password_hash = get_password_hash("demo123")
        
        # 1. Admin
        admin = db.query(User).filter(User.email == "admin@demo.com").first()
        if not admin:
            admin = User(
                email="admin@demo.com",
                hashed_password=password_hash,
                first_name="Admin",
                last_name="User",
                role=RoleEnum.ADMIN,
                school_id=school.id
            )
            db.add(admin)
            print("Added admin@demo.com")

        # 2. Counselor
        counselor = db.query(User).filter(User.email == "counselor@demo.com").first()
        if not counselor:
            counselor = User(
                email="counselor@demo.com",
                hashed_password=password_hash,
                first_name="Jane",
                last_name="Counselor",
                role=RoleEnum.COUNSELOR,
                school_id=school.id
            )
            db.add(counselor)
            db.commit()
            db.refresh(counselor)
            
            counselor_profile = Counselor(user_id=counselor.id)
            db.add(counselor_profile)
            print("Added counselor@demo.com")

        # 3. Student
        student = db.query(User).filter(User.email == "student@demo.com").first()
        if not student:
            student = User(
                email="student@demo.com",
                hashed_password=password_hash,
                first_name="John",
                last_name="Student",
                role=RoleEnum.STUDENT,
                school_id=school.id
            )
            db.add(student)
            db.commit()
            db.refresh(student)
            
            student_profile = Student(user_id=student.id, consent_given=True)
            db.add(student_profile)
            print("Added student@demo.com")

        db.commit()
        print("Demo users seeded successfully!")

    except Exception as e:
        print(f"Error seeding demo users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_demo_users()
