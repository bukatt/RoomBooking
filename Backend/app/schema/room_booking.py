from datetime import datetime, time
from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel

class RoomBookingBase(BaseModel):
    start_time: time

class RoomBookingCreate(RoomBookingBase):
    room_id: int

class RoomBookingUpdate(BaseModel):
    user_id: Optional[int] = None

class RoomBookingDB(RoomBookingBase):
    room_booking_id: int
    user_id: Optional[int] = None

class RoomBooking(RoomBookingBase):
    room_booking_id: int
    user_id: Optional[int] = None
    room_id: int
    
    class Config:
        orm_mode = True