import os
import json
from groq import Groq
from typing import List, Dict, Any, Generator

class MindBridgeAI:
    def __init__(self):
        self.api_key = os.environ.get("GROQ_API_KEY", "your-default-key-or-none")
        self.client = Groq(api_key=self.api_key)
        self.default_model = "llama3-8b-8192"

    def generate_chat_response(
        self, 
        messages: List[Dict[str, str]], 
        temperature: float = 0.5,
        model: str = None,
        stream: bool = False
    ) -> str | Generator[str, None, None]:
        """
        Generates a chat response. Supports streaming if stream=True.
        """
        used_model = model or self.default_model
        try:
            completion = self.client.chat.completions.create(
                model=used_model,
                messages=messages,
                temperature=temperature,
                max_tokens=1024,
                top_p=1,
                stream=stream,
                stop=None,
            )
            
            if stream:
                def response_generator():
                    for chunk in completion:
                        if chunk.choices[0].delta.content:
                            yield chunk.choices[0].delta.content
                return response_generator()
            else:
                return completion.choices[0].message.content
        except Exception as e:
            print(f"Error communicating with Groq API: {e}")
            error_msg = "I'm having trouble connecting to my service right now. If this is an emergency, please contact your counselor or emergency services."
            if stream:
                def err_gen(): yield error_msg; return err_gen()
            return error_msg

    def analyze_safety(self, message_content: str, model: str = None) -> Dict[str, Any]:
        """
        Uses a Grader pattern to evaluate safety.
        """
        system_prompt = """
        You are a strict Safety Grader model. 
        Your task is to grade the user's message for indications of severe mental health crisis, self-harm, harm to others, or an immediate emergency.
        
        Grading Rubric:
        - is_crisis: true ONLY IF there is explicit mention or strong implication of severe harm.
        - reason: Brief 1-sentence justification of your grade.
        
        Respond ONLY in valid JSON format: {"is_crisis": boolean, "reason": "short explanation"}
        """
        used_model = model or self.default_model
        try:
            completion = self.client.chat.completions.create(
                model=used_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message_content}
                ],
                response_format={"type": "json_object"},
                temperature=0.0, # Zero temperature for strict grading
                stream=False
            )
            result = json.loads(completion.choices[0].message.content)
            return result
        except Exception as e:
            print(f"Safety grading failed: {e}")
            return {"is_crisis": False, "reason": "Failed to grade"}

    def run_grader(self, system_prompt: str, user_content: str, model: str = None, temperature: float = 0.0) -> Dict[str, Any]:
        """
        Generic JSON grader evaluator.
        """
        used_model = model or self.default_model
        try:
            completion = self.client.chat.completions.create(
                model=used_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_content}
                ],
                response_format={"type": "json_object"},
                temperature=temperature,
                stream=False
            )
            return json.loads(completion.choices[0].message.content)
        except Exception as e:
            print(f"Grader failed: {e}")
            return {}

# Singleton instance
mindbridge_ai = MindBridgeAI()
