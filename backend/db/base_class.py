from typing import Any

from sqlalchemy.ext.declarative import declarative_base, declared_attr


class CustomBase:
    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

    # To allow comparison between instances
    def __eq__(self, other: Any) -> bool:
        if isinstance(other, self.__class__):
            return self.id == other.id
        return False
    
    # For easier debugging
    def __str__(self) -> str:
        return f"{self.__class__.__name__}(id={self.id})"


Base = declarative_base(cls=CustomBase) 