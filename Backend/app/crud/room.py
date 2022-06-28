from sqlalchemy.orm import Session
from models import room as room_model
from models import room_booking as room_booking_model
from schema import room as room_schema


def get_company_rooms(db: Session, company_id: int):
    return db.query(room_model.Room).filter(room_model.Room.company_id == company_id).all()

def get_room_by_name(db: Session, room_name: str):
    return db.query(room_model.Room).filter(room_model.Room.name == room_name).first()

def get_rooms_by_booking_user(db: Session, id: int):
    return db.query(room_model.Room).join(room_booking_model.RoomBooking).filter(room_booking_model.RoomBooking.user_id == id).all()

def create_room(db: Session, room: room_schema.RoomCreate):
    db_room = room_model.Room(**room.dict())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room