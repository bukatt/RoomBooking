from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from schema import login as login_schema
import auth_util
from db.db import get_db

router = APIRouter()

@router.post("/token", response_model = login_schema.LoginResponse)
async def login( db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    user = auth_util.authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = auth_util.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}      
