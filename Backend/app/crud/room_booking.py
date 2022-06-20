from sqlalchemy.orm import Session
from schema import room_booking as room_booking_schema
from models import room_booking as room_booking_model
from crud import user as user_crud

def get_bookings_by_email(db: Session, email):
    user = user_crud.get_user_by_email(email)
    return db.query(room_booking_model.RoomBooking).filter(room_booking_model.RoomBooking.user_id == user.id).all()

def create_room_booking(db: Session, booking: room_booking_schema.RoomBookingCreate):
    db_booking = room_booking_model.RoomBooking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking