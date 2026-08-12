from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core import security
from app.core.config import settings
from app.models.core import User, School, RoleEnum
from app.schemas.user import UserCreate, UserResponse, Token, SchoolAdminRegisterRequest, SchoolResponse

router = APIRouter()

from typing import List

@router.get("/schools", response_model=List[SchoolResponse])
def get_schools(db: Session = Depends(deps.get_db)):
    return db.query(School).all()

@router.post("/register/school", response_model=UserResponse)
def register_school_admin(payload: SchoolAdminRegisterRequest, db: Session = Depends(deps.get_db)):
    user_in = payload.admin
    school_in = payload.school

    # Check if admin email already exists
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    # Enforce role
    if user_in.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=400, detail="Initial school user must be an ADMIN.")
        
    # Create school
    new_school = School(name=school_in.name, address=school_in.address)
    db.add(new_school)
    db.commit()
    db.refresh(new_school)

    # Create admin
    user = User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        role=user_in.role,
        school_id=new_school.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate, db: Session = Depends(deps.get_db)):
    # Standard registration assumes they have been given an explicit school_id
    if not user_in.school_id:
        raise HTTPException(status_code=400, detail="Must provide a school_id to register.")

    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already exists.")
        
    user = User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        role=user_in.role,
        school_id=user_in.school_id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=Token)
def login(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(deps.get_current_user)):
    return current_user
