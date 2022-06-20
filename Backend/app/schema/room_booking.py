from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel
from .user import UserBase
from .room import RoomBase

class RoomBookingBase(BaseModel):
    start_time: datetime.hour
    end_time: datetime.hour

class RoomBookingUser(RoomBookingBase):
    user: UserBase

class RoomBookingRoom(RoomBookingBase):
    room: RoomBase

class RoomBookingCreate(RoomBookingBase):
    user_id: int
    room_id: int

class RoomBookingDB(RoomBookingBase):
    room_booking_id: int

class RoomBooking(RoomBookingBase):
    room_booking_id: int

    class Config:
        orm_mode = True