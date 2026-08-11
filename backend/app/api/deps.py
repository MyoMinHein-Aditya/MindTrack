from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.core.config import settings
from app.models.core import User, RoleEnum

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    except (jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user

def get_current_active_student(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != RoleEnum.STUDENT:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user

def get_current_active_counselor(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != RoleEnum.COUNSELOR:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user

def get_current_active_teacher(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != RoleEnum.TEACHER:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user

def get_current_active_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user
