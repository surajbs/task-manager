from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=100
    )


class TaskUpdate(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=100
    )


class TaskResponse(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True