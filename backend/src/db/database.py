from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# Default to a local Postgres instance if not provided
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://medagent:medagent_password@127.0.0.1:5433/medagent_db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
