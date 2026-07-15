import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# ==========================================
# Database Configuration
# ==========================================

DATABASE_URL = os.getenv("DATABASE_URL")

# ------------------------------------------
# Production (Neon PostgreSQL)
# ------------------------------------------

if DATABASE_URL:

    # Some providers use postgres://
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace(
            "postgres://",
            "postgresql://",
            1,
        )

    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
    )

# ------------------------------------------
# Local Development (SQLite)
# ------------------------------------------

else:

    DATABASE_URL = "sqlite:///./tasks.db"

    engine = create_engine(
        DATABASE_URL,
        connect_args={
            "check_same_thread": False,
        },
    )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


# ==========================================
# Database Dependency
# ==========================================

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()