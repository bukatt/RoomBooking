from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Time
from sqlalchemy.orm import relationship
from db.db import Base


class RoomBooking(Base):
    __tablename__ = "room_booking"
    room_booking_id = Column(Integer, primary_key=True, index=True)
    start_time = Column(Time)
    room_id = Column(Integer, ForeignKey("room.room_id"))
    user_id = Column(Integer, ForeignKey("user.user_id"))
    user = relationship("User", backref="room_bookings", lazy=True)
