import os
from typing import Generator
from sqlalchemy import  create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings

#DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, echo=True)

engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()