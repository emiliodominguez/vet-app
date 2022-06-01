from typing import Dict, List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import Base
from schemas import ClientSchema, ClientCreate
import crud
from connection import SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/clients/", response_model=ClientSchema)
def create_user(user: ClientCreate, db: Session = Depends(get_db)) -> ClientSchema:
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=409, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.put("/clients/{user_id}", response_model=ClientSchema)
def update_user(user_id: int, user: ClientCreate, db: Session = Depends(get_db)) -> ClientCreate:
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=204, detail="User does not exists")
    return crud.update_user(db=db, user=user, db_user=db_user)

@app.patch("/clients/{user_id}", response_model=Dict)
def soft_delete_user(user_id: int, db: Session = Depends(get_db)) -> Dict:
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=204, detail="User does not exists")
    return crud.soft_delete_user(db=db, db_user=db_user)

@app.delete("/clients/{user_id}", response_model=Dict)
def delete_user(user_id: int, db: Session = Depends(get_db)) -> Dict:
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=204, detail="User does not exists")
    return crud.delete_user(db=db, db_user=db_user)


@app.get("/clients/", response_model=list[ClientSchema])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> List[ClientSchema]:
    clients = crud.get_clients(db, skip=skip, limit=limit)
    return clients


@app.get("/clients/{user_id}", response_model=ClientSchema)
def read_user(user_id: int, db: Session = Depends(get_db)) -> list[ClientSchema]:
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=204, detail="Client not found")
    return db_user

# @app.post("/clients/{user_id}/pets/", response_model=Pet)
# def create_pet_for_user(user_id: int, pet: PetCreate, db: Session = Depends(get_db)):
#     return crud.create_user_pet(db=db, pet=pet, user_id=user_id)


# @app.get("/pets/", response_model=list[Pet])
# def read_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     pets = crud.get_pets(db, skip=skip, limit=limit)
#     return pets
