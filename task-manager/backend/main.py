from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import engine, Base, get_db

from models.task_model import TaskDB
from models.user_model import UserDB

from schemas.task_schema import (
    TaskCreate,
    TaskUpdate,
    TaskResponse
)

from schemas.user_schema import (
    UserCreate,
    UserResponse,
    UserLogin
)

from auth import (
    hash_password,
    verify_password
)

app = FastAPI()

# Create DB tables
Base.metadata.create_all(bind=engine)


# =====================================
# TASK APIs
# =====================================

# CREATE TASK
@app.post(
    "/tasks",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):

    db_task = TaskDB(title=task.title)

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


# GET TASKS
@app.get(
    "/tasks",
    response_model=list[TaskResponse]
)
def get_tasks(
    db: Session = Depends(get_db)
):

    tasks = db.query(TaskDB).all()

    return tasks


# UPDATE TASK
@app.put(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: int,
    update_data: TaskUpdate,
    db: Session = Depends(get_db)
):

    task = db.query(TaskDB).filter(
        TaskDB.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = update_data.title

    db.commit()
    db.refresh(task)

    return task


# DELETE TASK
@app.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.query(TaskDB).filter(
        TaskDB.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {"success": True}


# =====================================
# USER APIs
# =====================================

# SIGNUP
@app.post(
    "/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    # Check existing email
    existing_user = db.query(UserDB).filter(
        UserDB.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Hash password
    hashed_pw = hash_password(user.password)

    # Create user
    db_user = UserDB(
        email=user.email,
        hashed_password=hashed_pw
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


# LOGIN
@app.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    # Find user
    db_user = db.query(UserDB).filter(
        UserDB.email == user.email
    ).first()

    # Check user exists
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    valid_password = verify_password(
        user.password,
        db_user.hashed_password
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "message": "Login successful"
    }


# GET USERS (Learning purpose only)
@app.get("/users")
def get_users(
    db: Session = Depends(get_db)
):

    users = db.query(UserDB).all()

    return [
        {
            "id": user.id,
            "email": user.email
        }
        for user in users
    ]