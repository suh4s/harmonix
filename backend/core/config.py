import os
import secrets
from typing import Any, Dict, List, Optional, Union
from urllib.parse import quote_plus

from pydantic import AnyHttpUrl, EmailStr, HttpUrl, PostgresDsn, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SERVER_NAME: str = "ConsultantAI"
    SERVER_HOST: AnyHttpUrl = "http://localhost"
    
    # API keys
    ANTHROPIC_API_KEY: Optional[str] = None
    PERPLEXITY_API_KEY: Optional[str] = None
    
    # Default model
    MODEL: str = "claude-3-haiku-20240307"
    
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost",
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # Database settings
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "consultantai")
    SQLALCHEMY_DATABASE_URI: Optional[str] = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    def assemble_db_connection(cls, v: Optional[str], info) -> Any:
        if isinstance(v, str):
            return v
            
        # Access the configuration values from the environment
        postgres_user = os.getenv("POSTGRES_USER", "postgres")
        postgres_password = os.getenv("POSTGRES_PASSWORD", "postgres")
        postgres_server = os.getenv("POSTGRES_SERVER", "localhost")
        postgres_db = os.getenv("POSTGRES_DB", "consultantai")
        
        # For SQLite (development)
        if os.getenv("DATABASE_URL", "").startswith("sqlite"):
            return os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./consultantai.db")
            
        # For PostgreSQL
        return f"postgresql+asyncpg://{postgres_user}:{quote_plus(postgres_password)}@{postgres_server}/{postgres_db}"
    
    # Initial superuser
    FIRST_SUPERUSER_EMAIL: EmailStr = "admin@consultantai.com"
    FIRST_SUPERUSER_PASSWORD: str = "admin123"  # Change this in production

    model_config = {
        "case_sensitive": True,
        "env_file": ".env"
    }


settings = Settings() 