from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel
from .room_booking import RoomBooking
from .company import Company, CompanyBase

class RoomBase(BaseModel):
    name: str
    company_id: int

class RoomCreate(RoomBase):
    pass

class RoomDB(RoomBase):
    room_id: int

class Room(RoomBase):
    room_id: int
    company: CompanyBase
    room_bookings: List[RoomBooking] = []
    class Config:
        orm_mode = True