from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.db import Base


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)
    company_id = Column(Integer, ForeignKey("company.company_id"))
    company = relationship("Company", back_populates="employees")
    room_bookings = relationship("RoomBookings")
