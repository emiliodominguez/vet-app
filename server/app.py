from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schemas
from connection import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/clients/", response_model=schemas.Client)
def create_user(user: schemas.ClientCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/clients/", response_model=list[schemas.Client])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clients = crud.get_clients(db, skip=skip, limit=limit)
    return clients


@app.get("/clients/{user_id}", response_model=schemas.Client)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_user


@app.post("/clients/{user_id}/pets/", response_model=schemas.Pet)
def create_pet_for_user(user_id: int, pet: schemas.PetCreate, db: Session = Depends(get_db)):
    return crud.create_user_pet(db=db, pet=pet, user_id=user_id)


@app.get("/pets/", response_model=list[schemas.Pet])
def read_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pets = crud.get_pets(db, skip=skip, limit=limit)
    return pets
