from typing import List, Dict
from sqlalchemy.orm import Session
import models, schemas


def get_user(db: Session, user_id: int) -> models.Client:
    return db.query(models.Client).filter(models.Client.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> models.Client:
    return db.query(models.Client).filter(models.Client.email == email).first()

def get_clients(db: Session, skip: int = 0, limit: int = 100) -> List[models.Client]:
    return db.query(models.Client).filter(models.Client.is_active == True).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.ClientCreate) -> models.Client:
    db_user = models.Client(email=user.email, name=user.name, age=user.age, birth_date=user.birth_date, phone=user.phone, address=user.address)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: schemas.ClientCreate, db_user:schemas.ClientCreate) -> schemas.ClientCreate:
    for key, value in user:
        setattr(db_user, key, value)
    db_user.is_active=True
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, db_user: schemas.ClientCreate) -> Dict:
    db.delete(db_user)
    db.commit()
    return {"ok": True}

def soft_delete_user(db: Session, db_user: schemas.ClientCreate) -> Dict:
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
