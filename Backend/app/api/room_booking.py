from typing import List
from models import user as user_model
from crud import room_booking as booking_crud
from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session
from schema import room_booking as booking_schema
from db.db import get_db

router = APIRouter()

@router.post("/room-booking", response_model=booking_schema.RoomBooking)
def create_room_booking(booking: booking_schema.RoomBookingCreate, db: Session = Depends(get_db)):
    return booking_crud.create_room_booking(db, booking)


@router.get("/room-bookings", response_model=List[booking_schema.RoomBookingRoom])
def read_user(email: int, db: Session = Depends(get_db)):
    bookings = booking_crud.get_bookings_by_email(db, email=email)
    return bookings