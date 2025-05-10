from datetime import datetime
import requests
import json

def extract_expenses(text: str):
    prompt = f"""You are an information extractor. Only respond with a JSON object.
Extract the following from the input:
amount (number)
category (must be one of: Food, Transportation, Housing, Utilities, Healthcare, Shopping, Other)
date (the date)
description (a short title describe the expense)
Input: "{text}"
Respond only with the JSON object"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma3:1b",
            "prompt": prompt,
            "stream": False
        }
    )


    print("Gemma API response:", response.json())

    json_str = response.json().get('response', '').strip()
    # Remove code block markers if present
    if json_str.startswith("```json"):
        json_str = json_str[len("```json"):].strip()
    if json_str.startswith("```"):
        json_str = json_str[len("```"):].strip()
    if json_str.endswith("```"):
        json_str = json_str[:-len("```")].strip()

    return json.loads(json_str)
