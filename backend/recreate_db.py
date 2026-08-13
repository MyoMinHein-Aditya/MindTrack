import asyncio
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal, engine, Base
import app.models.core
import app.models.assessment
import app.models.checkin
import app.models.risk_event

def recreate_db():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database recreated successfully!")

if __name__ == "__main__":
    recreate_db()
