from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship

from connection import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    age = Column(Integer)
    birth_date = Column(Date)
    phone = Column(String)
    address = Column(String)
    is_active = Column(Boolean, default=True)

    pets = relationship("Pet", back_populates="owner")

    def __repr__(self):
        return f'{self.id} - {self.email}'


class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    birth_date = Column(Date)
    type = Column(String)
    breed = Column(String)
    affection = Column(String)
    admission_date = Column(Date)
    owner_id = Column(Integer, ForeignKey("clients.id"))

    owner = relationship("Client", back_populates="pets")
