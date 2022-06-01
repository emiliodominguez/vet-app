from datetime import date
from pydantic import BaseModel


class PetBase(BaseModel):
    name: str
    birth_date: date
    type: str
    breed: str
    affection: str
    admission_date: date


class PetCreate(PetBase):
    pass


class Pet(PetBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class ClientBase(BaseModel):
    email: str
    name: str
    age: int
    birth_date: date
    phone: str
    address: str


class ClientCreate(ClientBase):
    pass


class ClientSchema(ClientBase):
    id: int
    is_active: bool
    pets: list[Pet] = []

    class Config:
        orm_mode = True
