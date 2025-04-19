from fastapi import FastAPI, Depends, HTTPException, Form, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from typing import Dict, Any, Optional
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

app = FastAPI(title="ConsultantAI API")

# Configure CORS with more permissive settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to ConsultantAI API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/v1/auth/login")
async def login(request: Request):
    # Try to parse as JSON first
    try:
        json_data = await request.json()
        email = json_data.get("email") or json_data.get("username")
        password = json_data.get("password")
    except Exception:
        # If not JSON, try to parse as form data
        form_data = await request.form()
        email = form_data.get("email") or form_data.get("username")
        password = form_data.get("password")
    
    # Log what we received
    print(f"Login attempt: email={email}, password={'*'*len(password) if password else None}")
    
    # Check credentials
    if email == "admin@consultantai.com" and password == "admin123":
        return {
            "access_token": "mock_token_for_testing",
            "token_type": "bearer",
        }
    else:
        # Return 401 for incorrect credentials
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.get("/api/v1/auth/me")
async def get_me():
    return {
        "id": "user-123",
        "email": "admin@consultantai.com",
        "full_name": "Admin User",
        "is_active": True
    }

@app.get("/api/v1/conversations")
async def get_conversations():
    return [
        {
            "id": "conv-1",
            "title": "Sample Consultation",
            "created_at": "2023-10-15T14:30:00Z",
            "updated_at": "2023-10-15T15:00:00Z"
        }
    ]

@app.get("/api/v1/personalities")
async def get_personalities():
    return [
        {
            "id": "creative-thinker",
            "name": "Creative Thinker",
            "description": "Specializes in creative ideas and innovation"
        },
        {
            "id": "analytical-expert",
            "name": "Analytical Expert",
            "description": "Provides data-driven insights and analysis"
        },
        {
            "id": "business-strategist",
            "name": "Business Strategist",
            "description": "Expert in business models and strategy"
        },
        {
            "id": "technical-architect",
            "name": "Technical Architect",
            "description": "Specializes in technical implementation"
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080) 