from typing import Optional
from sqlalchemy.orm import Session
from app.crud.base import BaseRepository
from app.models.core import User
from app.schemas.user import UserCreate, UserUpdate

class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

user_repo = UserRepository(User)
