import os
from typing import Dict, List, Any, Literal, Optional, TypedDict, Annotated
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

import langgraph.graph as graph
from langgraph.graph import START, END, StateGraph

from langchain_anthropic import ChatAnthropic
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from .personalities import get_personality
from .base import create_personality, AIPersonality

# Type definitions
class ConsultationState(TypedDict):
    """State for the consultation workflow"""
    user_input: str
    context: Dict[str, Any]
    personalities: List[str]
    all_responses: Dict[str, str]
    current_personality: Optional[str]
    summary: Optional[str]
    status: Literal["in_progress", "completed"]


def create_llm(model_name: str = "claude-3-haiku-20240307", temperature: float = 0.7):
    """Create a model instance"""
    return ChatAnthropic(
        model=model_name,
        temperature=temperature,
        api_key=os.getenv("ANTHROPIC_API_KEY")
    )


def route_personality(state: ConsultationState):
    """Route to the next personality or to summarization"""
    if not state["current_personality"]:
        # Start with the first personality
        return "process_with_personality"
    
    # Find current position in list
    try:
        idx = state["personalities"].index(state["current_personality"])
        if idx < len(state["personalities"]) - 1:
            # Move to next personality
            return "process_with_personality"
        else:
            # All personalities have responded, move to summarization
            return "summarize_responses"
    except ValueError:
        # Current personality not found, start from beginning
        return "process_with_personality"


async def process_with_personality(state: ConsultationState) -> ConsultationState:
    """Process input with the current personality"""
    # Determine which personality to use next
    if not state["current_personality"]:
        # Use the first personality
        next_personality_id = state["personalities"][0]
    else:
        # Find the index of the current personality and move to the next one
        try:
            idx = state["personalities"].index(state["current_personality"])
            next_personality_id = state["personalities"][idx + 1]
        except (ValueError, IndexError):
            # If not found or at the end, use the first one
            next_personality_id = state["personalities"][0]
    
    # Get the personality configuration
    personality_config = get_personality(next_personality_id)
    if not personality_config:
        # Fallback to a default if personality not found
        raise ValueError(f"Personality {next_personality_id} not found")
    
    # Create the AI personality
    personality = create_personality(personality_config)
    
    # Generate a response from the personality
    response = await personality.generate_response(
        state["user_input"], 
        context=state["context"]
    )
    
    # Update the state
    state["current_personality"] = next_personality_id
    if "all_responses" not in state:
        state["all_responses"] = {}
    state["all_responses"][next_personality_id] = response
    
    return state


async def summarize_responses(state: ConsultationState) -> ConsultationState:
    """Summarize all personality responses"""
    # Create a summarization prompt
    prompt = f"""You are a consultation coordinator. Below are responses from different experts to the following question or topic:

User Input: {state["user_input"]}

{'-' * 40}
"""
    
    # Add all responses to the prompt
    for personality_id, response in state["all_responses"].items():
        personality_config = get_personality(personality_id)
        name = personality_config["name"] if personality_config else personality_id
        prompt += f"\n# {name}'s Response:\n{response}\n\n{'-' * 40}\n"
    
    prompt += """
Please synthesize these different perspectives into a comprehensive summary that:
1. Highlights key points and insights from each expert
2. Identifies areas of agreement and disagreement
3. Presents a balanced view of the different perspectives
4. Suggests potential next steps or areas for further consideration

Your summary should be well-structured and help the user understand the diverse expert feedback they've received.
"""
    
    # Create LLM for summarization
    llm = create_llm(temperature=0.3)  # Lower temperature for more focused summary
    
    # Generate summary
    messages = [SystemMessage(content="You are a helpful assistant that summarizes expert consultations."), 
                HumanMessage(content=prompt)]
    response = await llm.ainvoke(messages)
    
    # Update state
    state["summary"] = response.content
    state["status"] = "completed"
    
    return state


def create_consultation_workflow() -> graph.StateGraph:
    """Create the consultation workflow graph"""
    # Define state graph
    workflow = StateGraph(ConsultationState)
    
    # Add nodes
    workflow.add_node("process_with_personality", process_with_personality)
    workflow.add_node("summarize_responses", summarize_responses)
    
    # Define edges
    workflow.add_edge(START, "process_with_personality")
    workflow.add_conditional_edges(
        "process_with_personality",
        route_personality,
        {
            "process_with_personality": "process_with_personality",
            "summarize_responses": "summarize_responses",
        }
    )
    workflow.add_edge("summarize_responses", END)
    
    # Compile the graph
    return workflow.compile()


async def run_consultation(
    user_input: str, 
    personalities: List[str], 
    context: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """Run a consultation with multiple AI personalities"""
    workflow = create_consultation_workflow()
    
    # Initialize state
    state = {
        "user_input": user_input,
        "context": context or {},
        "personalities": personalities,
        "all_responses": {},
        "current_personality": None,
        "summary": None,
        "status": "in_progress"
    }
    
    # Execute the workflow
    result = await workflow.ainvoke(state)
    
    return result 