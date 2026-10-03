from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict
from uuid import UUID

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    full_name: Optional[str]
    dietary_preferences: Optional[Dict[str, str]] = None
    pre_existing_conditions: Optional[List[str]] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
