from pydantic import BaseModel, Field


# =========================================
# CREATE TASK
# =========================================

class TaskCreate(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=100
    )


# =========================================
# UPDATE TASK
# =========================================

class TaskUpdate(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=100
    )

    completed: bool = False


# =========================================
# TASK RESPONSE
# =========================================

class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        from_attributes = True