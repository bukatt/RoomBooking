from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.db import Base


class Company(Base):
    __tablename__ = "company"
    company_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    employees = relationship("User")
    rooms = relationship("Room")