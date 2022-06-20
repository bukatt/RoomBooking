from datetime import timedelta
from datetime import datetime
from typing import Optional
from schema.user import UserDB
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import user as user_model
from schema import user as user_schema
from db.db import get_db
from crud import user as user_crud
from passlib.context import CryptContext
from jose import JWTError, jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "d88b1262e4234dcc055cc27aec6b19e92b3c4078078183cdd79aa5619f2ec08a"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password):
    return pwd_context.hash(password)


def authenticate_user(email: str, password: str, db: Session):
    user = user_crud.get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


async def get_current_active_user(current_user: user_schema.User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def decode_token(token, db: Session = Depends(get_db)):
    user = user_crud.get_user(db, token)
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=10080)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt