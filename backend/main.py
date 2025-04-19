from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Import routers
from backend.api.v1.auth import router as auth_router
from backend.api.v1.conversation import router as conversation_router
from backend.api.v1.document import router as document_router
from backend.api.v1.personality import router as personality_router
from backend.db.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database
    logger.info("Initializing database connection")
    await init_db()
    logger.info("Database initialized")
    yield
    # Clean up resources
    logger.info("Shutting down application")

# Initialize FastAPI app
app = FastAPI(
    title="Harmonix ConsultantAI API",
    description="AI-powered consultant system API",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(conversation_router, prefix="/api/v1/conversations", tags=["Conversations"])
app.include_router(document_router, prefix="/api/v1/documents", tags=["Documents"])
app.include_router(personality_router, prefix="/api/v1/personalities", tags=["AI Personalities"])

@app.get("/")
async def root():
    return {"message": "Welcome to Harmonix ConsultantAI API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8080, reload=True) 