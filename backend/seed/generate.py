import sys
import os
import random
from datetime import datetime, timedelta, timezone

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal, engine, Base
from app.models.core import User, School, Class, Student, Teacher, Counselor, RoleEnum
from app.models.assessment import AssessmentQuestion, Assessment, AssessmentResponse
from app.models.support import Intervention
from app.core.security import get_password_hash
from app.services.scoring import calculate_and_store_wellbeing
from app.services.trend import analyze_trends

import argparse

def seed_data(empty=False):
    db = SessionLocal()
    
    print("Clearing and recreating tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    print("Creating Assessment Questions...")
    questions = [
        AssessmentQuestion(category="Mood", question_text="How have you been feeling most days?", order=1),
        AssessmentQuestion(category="Sleep", question_text="How has your sleep been recently?", order=2),
        AssessmentQuestion(category="Energy", question_text="How has your energy been during the day?", order=3),
        AssessmentQuestion(category="Academic pressure", question_text="How stressful has schoolwork felt recently?", order=4),
        AssessmentQuestion(category="Social connection", question_text="How connected do you feel with your friends or classmates?", order=5),
        AssessmentQuestion(category="School experience", question_text="How comfortable do you feel at school?", order=6),
        AssessmentQuestion(category="Support availability", question_text="Do you feel you have someone you can talk to when something is bothering you?", order=7),
    ]
    db.add_all(questions)
    db.commit()

    print("Creating Interventions...")
    db.add_all([
        Intervention(title="Breathing Exercise", description="A 5-minute guided breathing activity.", category="Stress Management"),
        Intervention(title="Journaling", description="Write down your thoughts and feelings.", category="Self Reflection"),
        Intervention(title="Sleep Routine Activity", description="Create a healthy pre-sleep habit.", category="Sleep Hygiene"),
        Intervention(title="Study Planning", description="Organize your upcoming assignments.", category="Academic Support"),
    ])
    db.commit()

    if empty:
        print("Empty database initialized successfully (Zero fake data).")
        db.close()
        return

    # -------- DEMO DATA BELOW --------
    print("Creating School...")
    school = School(name="Demo High School", address="123 Education Lane")
    db.add(school)
    db.commit()
    db.refresh(school)

    print("Creating Demo Accounts...")
    pwd = get_password_hash("demo123")
    
    admin_user = User(email="admin@demo.com", hashed_password=pwd, first_name="Admin", last_name="User", role=RoleEnum.ADMIN, school_id=school.id)
    teacher_user = User(email="teacher@demo.com", hashed_password=pwd, first_name="Sarah", last_name="Teacher", role=RoleEnum.TEACHER, school_id=school.id)
    counselor_user = User(email="counselor@demo.com", hashed_password=pwd, first_name="Dr. James", last_name="Counselor", role=RoleEnum.COUNSELOR, school_id=school.id)
    
    db.add_all([admin_user, teacher_user, counselor_user])
    db.commit()
    
    db.add(Teacher(user_id=teacher_user.id))
    db.add(Counselor(user_id=counselor_user.id))
    db.commit()

    print("Creating Classes and 50 Students...")
    classes = []
    for c_name in ["Class 9-A", "Class 9-B", "Class 10-A"]:
        cls = Class(name=c_name, school_id=school.id)
        db.add(cls)
        classes.append(cls)
    db.commit()

    students = []
    for i in range(1, 51):
        s_user = User(
            email=f"student{i}@demo.com", 
            hashed_password=pwd, 
            first_name=f"Student", 
            last_name=f"{i}", 
            role=RoleEnum.STUDENT, 
            school_id=school.id
        )
        db.add(s_user)
        db.commit()
        
        student = Student(user_id=s_user.id, class_id=random.choice(classes).id, consent_given=True)
        db.add(student)
        students.append(student)
    db.commit()

    demo_student_user = User(email="student@demo.com", hashed_password=pwd, first_name="Aarav", last_name="Patel", role=RoleEnum.STUDENT, school_id=school.id)
    db.add(demo_student_user)
    db.commit()
    demo_student = Student(user_id=demo_student_user.id, class_id=classes[0].id, consent_given=True)
    db.add(demo_student)
    db.commit()

    print("Generating 8-12 weeks of Assessments for Aarav (Demo Story)...")
    start_date = datetime.now(timezone.utc) - timedelta(weeks=5)
    
    story_profiles = [
        [4, 4, 4, 4, 4, 4, 4],
        [4, 3, 4, 3, 4, 4, 4],
        [3, 3, 3, 2, 3, 4, 4],
        [3, 2, 3, 2, 2, 4, 3],
        [2, 2, 2, 1, 2, 3, 3],
    ]
    
    for week_idx, scores in enumerate(story_profiles):
        ass_date = start_date + timedelta(weeks=week_idx)
        ass = Assessment(student_id=demo_student.id, created_at=ass_date)
        db.add(ass)
        db.commit()
        db.refresh(ass)
        
        for q_idx, score in enumerate(scores):
            db.add(AssessmentResponse(assessment_id=ass.id, question_id=questions[q_idx].id, score=score))
        db.commit()
        
        calculate_and_store_wellbeing(db, ass.id, demo_student.id)
        analyze_trends(db, demo_student.id)
        
    print("Seed complete! Run backend using 'fastapi dev app/main.py'")
    db.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed the database.")
    parser.add_argument("--empty", action="store_true", help="Only create tables and base data (no demo users)")
    args = parser.parse_args()
    seed_data(args.empty)
