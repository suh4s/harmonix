import logging
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db.base import Base
from backend.db.database import engine, async_session
from backend.models.user import User
from backend.models.conversation import Conversation
from backend.models.document import Document

logger = logging.getLogger(__name__)

# Make sure all models are imported and registered with Base
# before creating tables


async def init_db():
    """Initialize the database with tables"""
    logger.info("Creating database tables")
    
    async with engine.begin() as conn:
        # Drop tables if they exist
        # await conn.run_sync(Base.metadata.drop_all)
        
        # Create tables
        await conn.run_sync(Base.metadata.create_all)
    
    logger.info("Database tables created")


async def create_initial_data():
    """Create initial data in the database if needed"""
    
    # Check if users exist
    async with async_session() as db:
        # Example of creating initial data if needed
        # This would typically include creating admin users, default settings, etc.
        pass 