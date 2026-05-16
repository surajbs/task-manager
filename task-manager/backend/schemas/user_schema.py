from pydantic import BaseModel, EmailStr


# SIGNUP INPUT
class UserCreate(BaseModel):
    email: EmailStr
    password: str


# LOGIN INPUT
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# USER RESPONSE
class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True