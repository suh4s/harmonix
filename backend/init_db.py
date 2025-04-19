import asyncio
import logging
from typing import List

from backend.db.database import engine, Base, get_db
from backend.db.base import Base
from backend.models.user import User
from backend.schemas.user import UserCreate
from backend.core.config import settings
from backend.crud.user import get_user_by_email, create_user

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def create_first_superuser() -> None:
    """Create a superuser if not exists"""
    async for db in get_db():
        user = await get_user_by_email(db, email=settings.FIRST_SUPERUSER_EMAIL)
        if not user:
            user_in = UserCreate(
                email=settings.FIRST_SUPERUSER_EMAIL,
                password=settings.FIRST_SUPERUSER_PASSWORD,
                full_name="Initial Admin",
                is_superuser=True,
                is_active=True,
            )
            user = await create_user(db, user_in=user_in)
            logger.info(f"Superuser {user.email} created")
        else:
            logger.info(f"Superuser {user.email} already exists")


async def init() -> None:
    """Initialize the database"""
    # Create tables
    async with engine.begin() as conn:
        # Uncomment to create tables - normally handled by Alembic
        # await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables should be created with Alembic migrations")
    
    # Create initial superuser
    try:
        await create_first_superuser()
    except Exception as e:
        logger.error(f"Error creating superuser: {e}")
        raise


if __name__ == "__main__":
    logger.info("Initializing database...")
    asyncio.run(init())
    logger.info("Database initialized") 