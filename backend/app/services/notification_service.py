from sqlalchemy.orm import Session
from app.models.core import Student
from app.models.assessment import Assessment

class NotificationService:
    def send_report_to_parent(self, student: Student, assessment: Assessment):
        """
        Stub logic to simulate sending the report to the parent's email or WhatsApp.
        """
        contact = student.parent_email or student.parent_phone or "No contact info provided"
        print(f"--- MOCK NOTIFICATION ---")
        print(f"To Parent: {contact}")
        print(f"Student: {student.user.first_name} {student.user.last_name}")
        print(f"Report: {assessment.report_text}")
        print(f"Category: {assessment.assigned_category}")
        print(f"-------------------------")

    def notify_counselor(self, student: Student, assessment: Assessment):
        """
        Stub logic to simulate notifying a counselor of a new assigned student or report.
        """
        if not student.assigned_counselor:
            return
            
        print(f"--- MOCK NOTIFICATION ---")
        print(f"To Counselor: {student.assigned_counselor.user.email}")
        print(f"New Assessment for Student: {student.user.first_name} {student.user.last_name}")
        print(f"Category: {assessment.assigned_category}")
        print(f"-------------------------")

notification_service = NotificationService()
