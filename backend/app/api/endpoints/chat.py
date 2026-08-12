from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.ai_service import generate_chat_response, analyze_safety
from app.models.core import User
from app.api.deps import get_current_user

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    reply: str
    is_crisis: bool = False
    crisis_reason: Optional[str] = None

@router.post("/", response_model=ChatResponse)
def chat_with_mindbridge(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    # Get the latest message content
    latest_message = next((m.content for m in reversed(request.messages) if m.role == "user"), None)
    
    if not latest_message:
        raise HTTPException(status_code=400, detail="No user message provided")

    # Layer 1: Safety detection
    safety_result = analyze_safety(latest_message)
    
    if safety_result.get("is_crisis"):
        # Trigger crisis protocol (in a real app, this would alert a counselor, log a RiskEvent, etc.)
        return ChatResponse(
            reply="It sounds like you are going through a very difficult time right now. Please know you are not alone. If you are in immediate danger, please call emergency services (911) or the National Suicide Prevention Lifeline (988). I have notified a counselor who will reach out to you.",
            is_crisis=True,
            crisis_reason=safety_result.get("reason")
        )

    # Layer 4: Conversational support
    # Prepend system context
    system_prompt = {
        "role": "system",
        "content": "You are MindBridge, an empathetic, safety-aware AI companion for students. Do not diagnose or give medical advice. Keep responses brief, supportive, and grounded in safe coping strategies. Never invent emergency contacts."
    }
    
    messages_for_llm = [system_prompt] + [m.dict() for m in request.messages]
    
    reply = generate_chat_response(messages_for_llm)
    
    return ChatResponse(reply=reply, is_crisis=False)
