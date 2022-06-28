from typing import List, Optional
from pydantic import BaseModel
from .user import UserBase

class CompanyBase(BaseModel):
    company_name: str
    domain: str
    class Config:
        orm_mode = True

class CompanyDB(CompanyBase):
    company_id: int

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    company_id: int
    employees: List[UserBase] = []

    class Config:
        orm_mode = True