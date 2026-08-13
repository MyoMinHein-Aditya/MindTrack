from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any

from app.api import deps
from app.models.core import User, Student, Counselor
from app.models.assessment import Assessment

router = APIRouter()

@router.get("/dashboard-data")
def get_admin_dashboard_data(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_admin)
):
    school_id = current_user.school_id

    # 1. Fetch Students Bulk Data
    # Join Student, User, and the latest Assessment for each student
    students = db.query(Student, User).join(User, Student.user_id == User.id).filter(User.school_id == school_id).all()
    
    student_data = []
    for student, user in students:
        # Get latest assessment for student
        latest_assessment = db.query(Assessment).filter(Assessment.student_id == student.id, Assessment.is_completed == True).order_by(Assessment.created_at.desc()).first()
        score = None
        risk = "Unknown"
        if latest_assessment and latest_assessment.assigned_category:
            score = f"Level {latest_assessment.assigned_category}"
            risk = "Low" if latest_assessment.assigned_category == 1 else "Moderate" if latest_assessment.assigned_category == 2 else "High"
            
        counselor_name = "Unassigned"
        if student.assigned_counselor_id:
            counselor_user = db.query(User).join(Counselor).filter(Counselor.id == student.assigned_counselor_id).first()
            if counselor_user:
                counselor_name = f"{counselor_user.first_name} {counselor_user.last_name}"

        student_data.append({
            "id": student.id,
            "name": f"{user.first_name} {user.last_name}",
            "email": user.email,
            "parent_email": student.parent_email,
            "assigned_counselor": counselor_name,
            "latest_score": score,
            "risk_category": risk,
            "risk_level": student.risk_category # 1, 2, or 3
        })

    # 2. Fetch Counselors Data
    counselors = db.query(Counselor, User).join(User, Counselor.user_id == User.id).filter(User.school_id == school_id).all()
    
    counselor_data = []
    online_count = 0
    for counselor, user in counselors:
        assigned_students_count = db.query(Student).filter(Student.assigned_counselor_id == counselor.id).count()
        is_online = user.is_active # Proxy for online status as per plan
        if is_online:
            online_count += 1
            
        counselor_data.append({
            "id": counselor.id,
            "name": f"{user.first_name} {user.last_name}",
            "email": user.email,
            "is_online": is_online,
            "assigned_students": assigned_students_count
        })

    # 3. Aggregate Stats
    total_students = len(student_data)
    total_counselors = len(counselors)
    
    return {
        "students": student_data,
        "counselors": counselor_data,
        "stats": {
            "total_students": total_students,
            "total_counselors": total_counselors,
            "online_counselors": online_count
        }
    }
