from pydantic import BaseModel, EmailStr, Field


# ============================
# SIGNUP
# ============================

class UserCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100
    )

    email: EmailStr

    password: str = Field(
        min_length=6
    )


# ============================
# LOGIN
# ============================

class UserLogin(BaseModel):
    email: EmailStr

    # No min_length validation here.
    # Authentication should always return
    # "Invalid email or password"
    # instead of validation errors.
    password: str


# ============================
# RESPONSE
# ============================

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True