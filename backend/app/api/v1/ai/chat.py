
import json

import httpx
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import get_current_user
from app.services.ai_business_service import AIBusinessService


router = APIRouter()
business_service = AIBusinessService()

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:1.5b"

# Reuse the HTTP connection instead of creating one for every question.
http_client = httpx.AsyncClient(timeout=90.0)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    response: str


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    # Retrieve real business data from PostgreSQL.
    try:
        business_data = business_service.get_business_context(db)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Could not retrieve business data.",
        )

    prompt = f"""
You are an AI Business Intelligence Assistant.

Answer using only the business data provided.
Use simple English and concise answers.
Never invent figures or facts.
If information is unavailable, say so.
Do not assume a currency.

BUSINESS DATA:
{json.dumps(business_data, separators=(",", ":"))}

USER QUESTION:
{request.message}

Give a direct answer in a few sentences.
"""

    try:
        result = await http_client.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
                "keep_alive": "10m",
                "options": {
                    "num_predict": 180,
                    "temperature": 0.2,
                },
            },
        )

        result.raise_for_status()
        data = result.json()

        return {"response": data["response"].strip()}

    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="The AI model took too long. Please try again.",
        )

    except httpx.HTTPError:
        raise HTTPException(
            status_code=502,
            detail="Could not connect to the local AI model.",
        )
