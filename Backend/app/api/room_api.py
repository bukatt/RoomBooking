from datetime import datetime
from typing import List
from crud import room_booking as booking_crud
from crud import user as user_crud
from crud import room as room_crud
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from schema import room as room_schema
from schema import user as user_schema
from db.db import get_db
import auth_util

router = APIRouter()

@router.get("/rooms/", response_model=List[room_schema.Room])
def get_rooms_by_user_booking(id: int, db: Session = Depends(get_db)):
    rooms = room_crud.get_rooms_by_booking_user(db, id=id)
    return rooms

@router.get("/rooms", response_model=List[room_schema.Room])
def get_rooms(db: Session = Depends(get_db), current_user: user_schema.User = Depends(auth_util.get_current_user)):
    rooms = room_crud.get_company_rooms(db, current_user.company_id)
    return rooms