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


def get_db():
    """
    Opens an instance of the db connection, 
    yield it for the endpoint to use it, and then closes it
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/clients/", response_model=ClientSchema)
def create_client(client: ClientCreate, db: Session = Depends(get_db)) -> ClientSchema:
    db_client = crud.get_client_by_email(db, email=client.email)
    if db_client:
        raise HTTPException(status_code=409, detail="Email already registered")
    return crud.create_client(db=db, client=client)

@app.put("/clients/{client_id}", response_model=ClientSchema)
def update_client(client_id: int, client: ClientCreate, db: Session = Depends(get_db)) -> ClientCreate:
    db_client = crud.get_client(db, client_id=client_id)
    if not db_client:
        raise HTTPException(status_code=204, detail="User does not exists")
    return crud.update_client(db=db, client=client, db_client=db_client)

@app.patch("/clients/{client_id}", response_model=Dict)
def soft_delete_client(client_id: int, db: Session = Depends(get_db)) -> Dict:
    db_client = crud.get_client(db, client_id=client_id)
    if not db_client:
        raise HTTPException(status_code=204, detail="User does not exists")
    return crud.soft_delete_client(db=db, db_client=db_client)

@app.delete("/clients/{client_id}", response_model=Dict)
def delete_client(client_id: int, db: Session = Depends(get_db)) -> Dict:
    db_client = crud.get_client(db, client_id=client_id)
    if not db_client:
        raise HTTPException(status_code=204, detail="User does not exists")
    return crud.delete_client(db=db, db_client=db_client)


@app.get("/clients/", response_model=list[ClientSchema])
def read_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> List[ClientSchema]:
    clients = crud.get_clients(db, skip=skip, limit=limit)
    return clients


@app.get("/clients/{client_id}", response_model=ClientSchema)
def read_client(client_id: int, db: Session = Depends(get_db)) -> list[ClientSchema]:
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=204, detail="Client not found")
    return db_client

# @app.post("/clients/{client_id}/pets/", response_model=Pet)
# def create_pet_for_client(client_id: int, pet: PetCreate, db: Session = Depends(get_db)):
#     return crud.create_client_pet(db=db, pet=pet, client_id=client_id)


# @app.get("/pets/", response_model=list[Pet])
# def read_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     pets = crud.get_pets(db, skip=skip, limit=limit)
#     return pets
