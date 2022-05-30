from typing import Union

from pydantic import BaseModel


class PetBase(BaseModel):
    title: str
    description: Union[str, None] = None


class PetCreate(PetBase):
    pass


class Pet(PetBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class ClientBase(BaseModel):
    email: str


class ClientCreate(ClientBase):
    password: str


class Client(ClientBase):
    id: int
    is_active: bool
    pets: list[Pet] = []

    class Config:
        orm_mode = True
