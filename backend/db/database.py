import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import async_sessionmaker
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

# Use SQLite for development
DATABASE_URL = "sqlite+aiosqlite:///./consultantai.db"

# Configure connect args for SQLite 
connect_args = {"check_same_thread": False}

# Create async engine
engine = create_async_engine(
    DATABASE_URL, 
    echo=True,
    connect_args=connect_args
)

# Create async session factory
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# Create declarative base for models
Base = declarative_base()

async def init_db():
    """Initialize database tables"""
    async with engine.begin() as conn:
        # Create tables on startup
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    """Get database session"""
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close() 