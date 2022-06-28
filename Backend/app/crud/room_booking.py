from http.client import HTTPException
from sqlalchemy.orm import Session
from schema import room_booking as room_booking_schema
from models import room_booking as room_booking_model
from crud import user as user_crud

def get_booking_by_id(db:Session, id):
    return db.query(room_booking_model.RoomBooking).filter(room_booking_model.RoomBooking.room_booking_id == id).first()

def get_bookings_by_email(db: Session, id):
    return db.query(room_booking_model.RoomBooking).filter(room_booking_model.RoomBooking.user_id == user.id).all()

def update_room_booking(db: Session, booking_id: int, booking: room_booking_schema.RoomBookingUpdate):
    db_booking = db.query(room_booking_model.RoomBooking).filter(room_booking_model.RoomBooking.room_booking_id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Sorry, booking not found")
    booking_data = booking.dict(exclude_unset=True)
    for key, value in booking_data.items():
        setattr(db_booking, key, value)

    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def create_room_booking(db: Session, booking: room_booking_schema.RoomBookingCreate):
    db_booking = room_booking_model.RoomBooking(**booking.dict())
    print(db_booking)
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking