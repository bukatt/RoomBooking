from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel
from .room import Room

class RoomBookingRoom(BaseModel):
    start_time: datetime
    end_time: datetime
    room: Room