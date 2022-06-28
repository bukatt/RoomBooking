from sqlalchemy.orm import Session
from models import company as company_model
from schema import company as company_schema

def get_company_by_email(db: Session, email: str):
    domain = email.split('@')[1]
    return db.query(company_model.Company).filter(company_model.Company.domain == domain).first()

def get_company_by_name(db: Session, name: str):
    return db.query(company_model.Company).filter(company_model.Company.company_name == name).first()

def get_company_by_id(db: Session, id: int):
    return db.query(company_model.Company).filter(company_model.Company.company_id == id).first()

def create_company(db: Session, company: company_schema.CompanyCreate):
    db_company = company_model.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company