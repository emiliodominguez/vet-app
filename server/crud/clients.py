from typing import List, Dict, Union
from sqlalchemy.orm import Session
from models import Client
from schemas import ClientCreate, ClientSchema


def get_client(db: Session, client_id: int) -> Union[Client,None]:
    """
    Get one client by Id
    """
    return db.query(Client).filter(Client.id == client_id).first()

def get_client_by_email(db: Session, email: str) ->  Union[Client,None]:
    """
    Get one client by email (unique)
    """
    return db.query(Client).filter(Client.email == email).first()

def get_clients(db: Session, skip: int = 0, limit: int = 100) -> List[ClientSchema]:
    """
    Get list of active clients
    """
    return db.query(Client).filter(Client.is_active == True).offset(skip).limit(limit).all()

def create_client(db: Session, client: ClientCreate) -> Client:
    """
    Creates new client
    """
    db_client = Client(
        email = client.email,
        name = client.name,
        age = client.age,
        birth_date = client.birth_date,
        phone = client.phone,
        address = client.address)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def update_client(db: Session, client: ClientCreate, db_client:ClientCreate) -> ClientCreate:
    """
    Updates a client
    """
    for key, value in client:
        setattr(db_client, key, value)
    db_client.is_active = True
    db.commit()
    db.refresh(db_client)
    return db_client

def delete_client(db: Session, db_client: ClientCreate) -> Dict:
    """
    Deletes a client
    """
    db.delete(db_client)
    db.commit()
    return {"ok": True}

def soft_delete_client(db: Session, db_client: ClientCreate) -> Dict:
    """
    MArk as inactive a client
    """
    db_client.is_active = False
    db.commit()
    db.refresh(db_client)
    return {"ok": True}
