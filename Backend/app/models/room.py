from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.db import Base
from .company import Company
from .room_booking import RoomBooking


class Room(Base):
    __tablename__ = "room"
    room_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    company_id = Column(Integer, ForeignKey("company.company_id"))
    company = relationship("Company", backref="rooms")
    room_bookings = relationship("RoomBooking", backref="room")