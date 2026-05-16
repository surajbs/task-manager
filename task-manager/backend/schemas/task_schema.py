from pydantic import BaseModel

# Input schema
class TaskCreate(BaseModel):
    title: str


# Update schema
class TaskUpdate(BaseModel):
    title: str


# Response schema
class TaskResponse(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True