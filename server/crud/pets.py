from typing import List, Dict, Union
from sqlalchemy.orm import Session
from models import Pet
from schemas import PetCreate, PetSchema


def get_pet_by_owner(db: Session, client_id: int) -> List[Pet]:
    """
    Get one pet by Owner Id
    """
    return db.query(Pet).filter(Pet.owner_id == client_id).all()


def get_pet(db: Session, pet_id: int) -> Union[Pet,None]:
    """
    Get one pet by Id
    """
    return db.query(Pet).filter(Pet.id == pet_id).first()

def get_pets(db: Session, skip: int = 0, limit: int = 100) -> List[PetSchema]:
    """
    Get list of active pets
    """
    return db.query(Pet).offset(skip).limit(limit).all()

def create_pet(db: Session, pet: PetCreate) -> Pet:
    """
    Creates new pet
    """
    db_pet = Pet(
        name = pet.name,
        birth_date = pet.birth_date,
        type = pet.type,
        breed = pet.breed,
        affection = pet.affection,
        admission_date = pet.admission_date,
        owner_id = pet.owner_id)
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet

def update_pet(db: Session, pet: PetCreate, db_pet:PetCreate) -> PetCreate:
    """
    Updates a pet
    """
    for key, value in pet:
        setattr(db_pet, key, value)
    db_pet.is_active = True
    db.commit()
    db.refresh(db_pet)
    return db_pet

def delete_pet(db: Session, db_pet: PetCreate) -> Dict:
    """
    Deletes a pet
    """
    db.delete(db_pet)
    db.commit()
    return {"ok": True}
