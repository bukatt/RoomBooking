from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel
from .room_booking import RoomBookingBase

class RoomBase(BaseModel):
    name: str
    room_bookings: List[RoomBookingBase]
    
class RoomDB(RoomBase):
    room_id: int

class Room(RoomBase):
    room_id: int

    class Config:
        orm_mode = True