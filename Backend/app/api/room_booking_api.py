from typing import List
from crud import room_booking as booking_crud
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from schema import room_booking as booking_schema
from schema import room_booking_room as room_booking_room_schema
from db.db import get_db

router = APIRouter()

@router.post("/room-booking", response_model=booking_schema.RoomBooking)
def create_room_booking(booking: booking_schema.RoomBookingCreate, db: Session = Depends(get_db)):
    return booking_crud.create_room_booking(db, booking)

@router.patch("/room-booking/{booking_id}", response_model=booking_schema.RoomBooking)
async def update_room_booking(booking_id: int, booking: booking_schema.RoomBookingUpdate, db: Session = Depends(get_db)):
    updated_booking = booking_crud.update_room_booking(db, booking_id, booking)
    return updated_booking

@router.get("/room-booking", response_model=List[room_booking_room_schema.RoomBookingRoom])
def get_user_bookings(email: int, db: Session = Depends(get_db)):
    bookings = booking_crud.get_bookings_by_email(db, email=email)
    return bookings