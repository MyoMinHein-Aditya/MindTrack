import os
from groq import Groq
from pydantic import BaseModel
from typing import List

# Get GROQ_API_KEY from environment variables
client = Groq(api_key=os.environ.get("GROQ_API_KEY", "your-default-key-or-none"))

class Message(BaseModel):
    role: str
    content: str

def generate_chat_response(messages: List[dict]) -> str:
    """
    Generate a response from the Groq API.
    Messages should be a list of dicts with 'role' and 'content'.
    """
    try:
        completion = client.chat.completions.create(
            model="llama3-8b-8192", # Default, fast model
            messages=messages,
            temperature=0.5,
            max_tokens=1024,
            top_p=1,
            stream=False,
            stop=None,
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Error communicating with Groq API: {e}")
        return "I'm having trouble connecting to my service right now. If this is an emergency, please contact your counselor or emergency services."

def analyze_safety(message_content: str) -> dict:
    """
    A simple safety classifier layer using the LLM.
    Returns a dict with 'is_crisis' and 'reason'.
    """
    system_prompt = """
    You are a safety classification model.
    Analyze the user's message and determine if it indicates a severe mental health crisis, self-harm, harm to others, or an immediate emergency.
    Respond ONLY in JSON format: {"is_crisis": boolean, "reason": "short explanation"}
    """
    
    try:
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message_content}
            ],
            response_format={"type": "json_object"},
            temperature=0,
        )
        import json
        result = json.loads(completion.choices[0].message.content)
        return result
    except Exception as e:
        print(f"Safety analysis failed: {e}")
        return {"is_crisis": False, "reason": "Failed to analyze"}
