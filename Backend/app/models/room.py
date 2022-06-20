from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.db import Base


class Company(Base):
    __tablename__ = "company"
    room_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    room_bookings = relationship("RoomBooking")