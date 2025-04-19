from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.db.database import get_db
from backend.dependencies import get_current_active_user, get_current_active_superuser
from backend.models.user import User

router = APIRouter()


@router.get("/", response_model=List[dict])
async def list_personalities(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    List available AI personalities.
    """
    # TODO: Implement personality listing from database
    return [
        {
            "id": "creative-thinker",
            "name": "Creative Thinker",
            "description": "Specializes in brainstorming and creative ideas",
            "expertise": ["Innovation", "Creativity", "Brainstorming"],
            "category": "ideation"
        },
        {
            "id": "analytical-expert",
            "name": "Analytical Expert",
            "description": "Provides data-backed analytical insights",
            "expertise": ["Data Analysis", "Critical Thinking", "Research"],
            "category": "analysis"
        },
        {
            "id": "business-strategist",
            "name": "Business Strategist",
            "description": "Focuses on business strategy and market analysis",
            "expertise": ["Strategy", "Business Models", "Market Analysis"],
            "category": "business"
        }
    ]


@router.get("/{personality_id}", response_model=dict)
async def get_personality(
    personality_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get details of a specific AI personality.
    """
    # Mock data for illustration - would come from DB in real implementation
    personalities = {
        "creative-thinker": {
            "id": "creative-thinker",
            "name": "Creative Thinker",
            "description": "Specializes in brainstorming and creative ideas",
            "expertise": ["Innovation", "Creativity", "Brainstorming"],
            "category": "ideation",
            "prompt_template": "You are a creative thinking consultant with expertise in innovative ideas.",
            "is_active": True
        },
        "analytical-expert": {
            "id": "analytical-expert",
            "name": "Analytical Expert",
            "description": "Provides data-backed analytical insights",
            "expertise": ["Data Analysis", "Critical Thinking", "Research"],
            "category": "analysis",
            "prompt_template": "You are an analytical expert focused on data-driven insights.",
            "is_active": True
        }
    }
    
    if personality_id not in personalities:
        raise HTTPException(status_code=404, detail="Personality not found")
    
    return personalities[personality_id]


@router.post("/", response_model=dict)
async def create_personality(
    *,
    personality_data: dict,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Create a new AI personality (admin only).
    """
    # TODO: Implement personality creation in database
    return {
        "id": "new-personality-id",
        "name": personality_data.get("name", "New Personality"),
        "description": personality_data.get("description", ""),
        "expertise": personality_data.get("expertise", []),
        "category": personality_data.get("category", "general"),
        "prompt_template": personality_data.get("prompt_template", ""),
        "is_active": True
    } 