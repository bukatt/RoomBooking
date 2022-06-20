from sqlalchemy.orm import Session
from models import user as user_model
from schema import user as user_schema
import auth_util


def get_user(db: Session, user_id: int):
    return db.query(user_model.User).filter(user_model.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(user_model.User).filter(user_model.User.email == email).first()

def create_user(db: Session, user: user_schema.UserCreate):
    user.password = auth_util.hash_password(user.password)
    db_user = user_model.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user