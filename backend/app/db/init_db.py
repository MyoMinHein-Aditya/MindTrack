import sys
import os

# Add the backend directory to sys.path so we can run this directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.db.database import engine, Base
import app.models  # This imports all models so they register with Base

def init_db():
    print("Creating all database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db()
