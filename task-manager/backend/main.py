from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

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
    verify_password,
    create_access_token,
    verify_access_token
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Create database tables
Base.metadata.create_all(bind=engine)


# =========================================
# CURRENT USER
# =========================================

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    email = verify_access_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user = db.query(UserDB).filter(
        UserDB.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user


# =========================================
# TASK APIs
# =========================================

# CREATE TASK
@app.post(
    "/tasks",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_task(
    task: TaskCreate,
    current_user: UserDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    db_task = TaskDB(
        title=task.title,
        completed=False,
        user_id=current_user.id
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


# GET MY TASKS
@app.get(
    "/tasks",
    response_model=list[TaskResponse]
)
def get_tasks(
    current_user: UserDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    tasks = db.query(TaskDB).filter(
        TaskDB.user_id == current_user.id
    ).all()

    return tasks


# UPDATE MY TASK
@app.put(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: int,
    update_data: TaskUpdate,
    current_user: UserDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    task = db.query(TaskDB).filter(
        TaskDB.id == task_id,
        TaskDB.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = update_data.title
    task.completed = update_data.completed

    db.commit()
    db.refresh(task)

    return task


# DELETE MY TASK
@app.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    current_user: UserDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    task = db.query(TaskDB).filter(
        TaskDB.id == task_id,
        TaskDB.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "success": True
    }


# =========================================
# USER APIs
# =========================================

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

    existing_user = db.query(UserDB).filter(
        UserDB.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_pw = hash_password(user.password)

    db_user = UserDB(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


# LOGIN + JWT
@app.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(UserDB).filter(
        UserDB.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    valid_password = verify_password(
        user.password,
        db_user.hashed_password
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# GET CURRENT USER
@app.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    current_user: UserDB = Depends(get_current_user)
):
    return current_user


# GET USERS (Learning Purpose)
@app.get("/users")
def get_users(
    db: Session = Depends(get_db)
):

    users = db.query(UserDB).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
        for user in users
    ]