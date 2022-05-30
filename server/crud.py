from sqlalchemy.orm import Session

import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.Client).filter(models.Client.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.Client).filter(models.Client.email == email).first()


def get_clients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Client).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.ClientCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.Client(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_pets(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Pet).offset(skip).limit(limit).all()


def create_user_pet(db: Session, pet: schemas.PetCreate, user_id: int):
    db_pet = models.Pet(**pet.dict(), owner_id=user_id)
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet
