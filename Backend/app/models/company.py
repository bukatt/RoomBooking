from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.db import Base

class Company(Base):
    __tablename__ = "company"
    company_id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, unique=True, index=True)
    domain = Column(String, unique=True, index=True)