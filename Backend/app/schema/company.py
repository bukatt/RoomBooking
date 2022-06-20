from typing import List, Optional
from fastapi import FastAPI
from pydantic import BaseModel
from .room import RoomBase
from .user import UserBase
class CompanyBase(BaseModel):
    name: str
    rooms: List[RoomBase]
    employees: List[UserBase]

class CompanyDB(CompanyBase):
    company_id: int

class Company(CompanyBase):
    company_id: int

    class Config:
        orm_mode = True