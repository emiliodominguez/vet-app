from typing import List, Dict
from sqlalchemy.orm import Session
from models import Client
from schemas import ClientCreate, ClientSchema


def get_user(db: Session, user_id: int) -> Client:
    return db.query(Client).filter(Client.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> Client:
    return db.query(Client).filter(Client.email == email).first()

def get_clients(db: Session, skip: int = 0, limit: int = 100) -> List[ClientSchema]:
    return db.query(Client).filter(Client.is_active == True).offset(skip).limit(limit).all()

def create_user(db: Session, user: ClientCreate) -> Client:
    db_user = Client(email=user.email, name=user.name, age=user.age, birth_date=user.birth_date, phone=user.phone, address=user.address)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: ClientCreate, db_user:ClientCreate) -> ClientCreate:
    for key, value in user:
        setattr(db_user, key, value)
    db_user.is_active=True
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, db_user: ClientCreate) -> Dict:
    db.delete(db_user)
    db.commit()
    return {"ok": True}

def soft_delete_user(db: Session, db_user: ClientCreate) -> Dict:
    db_user.is_active = False
    db.commit()
    db.refresh(db_user)
    return {"ok": True}

# def get_pets(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Pet).offset(skip).limit(limit).all()

# def create_user_pet(db: Session, pet: schemas.PetCreate, user_id: int):
#     db_pet = models.Pet(**pet.dict(), owner_id=user_id)
#     db.add(db_pet)
#     db.commit()
#     db.refresh(db_pet)
#     return db_pet
