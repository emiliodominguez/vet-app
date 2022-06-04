from typing import Dict, List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import Base
from schemas import ClientSchema, ClientCreate, PetCreate, PetSchema
from connection import engine, get_db
from crud import clients, pets

Base.metadata.create_all(bind = engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


# Client endpoints

@app.get("/clients/", response_model = list[ClientSchema])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clients_list = clients.get_clients(db, skip = skip, limit = limit)
    return clients_list

@app.get("/clients/{client_id}", response_model = ClientSchema)
def read_client(client_id: int, db: Session = Depends(get_db)) -> list[ClientSchema]:
    db_client = clients.get_client(db, client_id = client_id)
    if db_client is None:
        raise HTTPException(status_code = 204, detail = "Client not found")
    return db_client

@app.post("/clients/", response_model = ClientSchema)
def create_client(client: ClientCreate, db: Session = Depends(get_db)) -> ClientSchema:
    db_client = clients.get_client_by_email(db, email = client.email)
    if db_client:
        raise HTTPException(status_code = 409, detail = "Email already registered")
    return clients.create_client(db = db, client = client)

@app.put("/clients/{client_id}", response_model = ClientSchema)
def update_client(client_id: int, client: ClientCreate, db: Session = Depends(get_db)) -> ClientCreate:
    db_client = clients.get_client(db, client_id = client_id)
    if not db_client:
        raise HTTPException(status_code = 204, detail = "User does not exists")
    return clients.update_client(db = db, client = client, db_client = db_client)

@app.patch("/clients/{client_id}", response_model = Dict)
def soft_delete_client(client_id: int, db: Session = Depends(get_db)) -> Dict:
    db_client = clients.get_client(db, client_id = client_id)
    if not db_client:
        raise HTTPException(status_code = 204, detail = "User does not exists")
    return clients.soft_delete_client(db = db, db_client = db_client)

@app.delete("/clients/{client_id}", response_model = Dict)
def delete_client(client_id: int, db: Session = Depends(get_db)) -> Dict:
    db_client = clients.get_client(db, client_id = client_id)
    if not db_client:
        raise HTTPException(status_code = 204, detail = "User does not exists")
    return clients.delete_client(db = db, db_client = db_client)

# Pet endpoints

@app.get("/pets/", response_model = list[PetSchema])
def read_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pets_list = pets.get_pets(db, skip = skip, limit = limit)
    return pets_list

@app.get("/pets/{pet_id}", response_model = PetSchema)
def read_pet_by_id(pet_id: int, db: Session = Depends(get_db)) -> list[PetSchema]:
    db_pet = pets.get_pet(db, pet_id = pet_id)
    if db_pet is None:
        raise HTTPException(status_code = 204, detail = "Pet not found")
    return db_pet

@app.get("/pets_by_owner/{client_id}", response_model = PetSchema)
def read_pet_by_owner(client_id: int, db: Session = Depends(get_db)) -> list[PetSchema]:
    db_pet = pets.get_pet_by_owner(db, client_id = client_id)
    if db_pet is None:
        raise HTTPException(status_code = 204, detail = "Pet not found")
    return db_pet

@app.post("/pets/", response_model = PetSchema)
def create_pet(pet: PetCreate, db: Session = Depends(get_db)) -> PetSchema:
    return pets.create_pet(db = db, pet = pet)

@app.put("/pets/{pet_id}", response_model = PetSchema)
def update_pet(pet_id: int, pet: PetCreate, db: Session = Depends(get_db)) -> PetCreate:
    db_pet = pets.get_pet(db, pet_id = pet_id)
    if not db_pet:
        raise HTTPException(status_code = 204, detail = "Pet does not exists")
    return pets.update_pet(db = db, pet = pet, db_pet = db_pet)

@app.delete("/pets/{pet_id}", response_model = Dict)
def delete_pet(pet_id: int, db: Session = Depends(get_db)) -> Dict:
    db_pet = pets.get_pet(db, pet_id = pet_id)
    if not db_pet:
        raise HTTPException(status_code = 204, detail = "Pet does not exists")
    return pets.delete_pet(db = db, db_pet = db_pet)
