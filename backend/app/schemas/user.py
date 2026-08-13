from pydantic import BaseModel, EmailStr
from typing import Optional, Any
from app.models.core import RoleEnum

class SchoolBase(BaseModel):
    name: str
    address: Optional[str] = None

class SchoolCreate(SchoolBase):
    pass

class SchoolResponse(SchoolBase):
    id: int
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: RoleEnum
    school_id: Optional[int] = None

class UserCreate(UserBase):
    password: str

class SchoolAdminRegisterRequest(BaseModel):
    school: SchoolCreate
    admin: UserCreate

class StudentProfileBase(BaseModel):
    id: int
    streak_count: int = 0
    points: int = 0
    risk_category: int = 1
    assigned_counselor_id: Optional[int] = None
    parent_email: Optional[str] = None
    parent_phone: Optional[str] = None
    assessment_frequency: str = "MONTHLY"

    class Config:
        from_attributes = True

class UserResponse(UserBase):
    id: int
    is_active: bool
    student_profile: Optional[StudentProfileBase] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[int] = None
