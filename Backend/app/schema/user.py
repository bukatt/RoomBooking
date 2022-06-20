from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel
from .room_booking import RoomBookingRoom
class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str

class UserBookings(UserBase):
    room_bookings: List[RoomBookingRoom]

class UserCreate(UserBase):
    password: str

class UserDB(UserBase):
    password: str
    id: int

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
