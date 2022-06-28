from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from .room_booking import RoomBooking
class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str

class UserBookings(UserBase):
    room_bookings: List[RoomBooking] = []

class UserCreate(UserBase):
    password: str

class UserCreateCompany(UserCreate):
    company_id: int

class UserDB(UserBase):
    password: str
    user_id: int

class User(UserBase):
    user_id: int
    company_id: int

    class Config:
        orm_mode = True
