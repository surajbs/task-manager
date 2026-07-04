from pydantic import BaseModel, EmailStr, Field


# SIGNUP INPUT
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(
        min_length=6
    )


# LOGIN INPUT
class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(
        min_length=6
    )


# RESPONSE
class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True