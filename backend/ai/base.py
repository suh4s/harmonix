import os
from typing import Dict, List, Any, Optional

from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.messages import SystemMessage, HumanMessage

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Default model to use
DEFAULT_MODEL = os.getenv("MODEL", "claude-3-haiku-20240307")

class AIPersonality:
    """Base class for AI personalities"""
    
    def __init__(
        self,
        personality_id: str,
        name: str,
        description: str,
        expertise: List[str],
        system_prompt: str,
        model_name: str = DEFAULT_MODEL,
        temperature: float = 0.7,
    ):
        self.personality_id = personality_id
        self.name = name
        self.description = description
        self.expertise = expertise
        self.system_prompt = system_prompt
        self.model_name = model_name
        self.temperature = temperature
        
        # Initialize model
        self.llm = ChatAnthropic(
            model=self.model_name,
            temperature=self.temperature,
            api_key=os.getenv("ANTHROPIC_API_KEY")
        )
        
        # Initialize prompt template
        self.system_message = SystemMessage(content=system_prompt)
        
    async def generate_response(self, user_input: str, context: Optional[Dict[str, Any]] = None) -> str:
        """Generate a response from the AI personality"""
        human_message = HumanMessage(content=user_input)
        messages = [self.system_message, human_message]
        
        response = await self.llm.ainvoke(messages)
        return response.content

def create_personality(personality_data: Dict[str, Any]) -> AIPersonality:
    """Create an AIPersonality instance from configuration data"""
    return AIPersonality(
        personality_id=personality_data.get("id"),
        name=personality_data.get("name"),
        description=personality_data.get("description", ""),
        expertise=personality_data.get("expertise", []),
        system_prompt=personality_data.get("prompt_template", "You are a helpful assistant."),
        model_name=personality_data.get("model_name", DEFAULT_MODEL),
        temperature=personality_data.get("temperature", 0.7)
    ) 