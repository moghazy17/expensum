from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from parser.expense_parser import extract_expenses
from typing import Optional
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ParseRequest(BaseModel):
    text: str

class ExpenseResponse(BaseModel):
    amount: float
    category: str
    date: str
    description: str

class ErrorResponse(BaseModel):
    error: str

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/parse", response_model=ExpenseResponse, responses={400: {"model": ErrorResponse}})
def parse(request: ParseRequest):
    try:
        result = extract_expenses(request.text)
        return {
            "amount": result["amount"],
            "category": result["category"] or "Other",
            "description": result["description"] or "",
            "date": result["date"] or "",
        }
    except Exception as e:
        raise Exception(f"Failed to parse Gemma response: {str(e)}. Raw Gemma result: {result}")


