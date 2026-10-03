from groq import Groq
import instructor
from pydantic import BaseModel
from typing import List, Optional
from src.core.config import settings
from src.ai.prompts import SYSTEM_PROMPT_EXTRACTION, SYSTEM_PROMPT_SYMPTOMS, SYSTEM_PROMPT_REPORT_SUMMARY

# Initialize the Groq client and patch it with Instructor for structured outputs
client = Groq(api_key=settings.GROQ_API_KEY)
instructor_client = instructor.from_groq(client, mode=instructor.Mode.JSON)

class ExtractedParameter(BaseModel):
    parameter_name: str
    value: float
    unit: Optional[str]
    reference_range: Optional[str]
    status: str  # "normal", "low", "high"

class ReportExtractionResult(BaseModel):
    parameters: List[ExtractedParameter]

class SymptomAnalysisResult(BaseModel):
    possible_conditions: List[str]
    ai_advice: str

def extract_report_data(ocr_text: str) -> ReportExtractionResult:
    """Extracts structured lab parameters from raw OCR text."""
    if not settings.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is missing")

    response = instructor_client.chat.completions.create(
        model="llama3-70b-8192",
        response_model=ReportExtractionResult,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT_EXTRACTION},
            {"role": "user", "content": f"Extract parameters from this text:\n\n{ocr_text}"}
        ]
    )
    return response

def analyze_symptoms(symptoms: List[str], medical_context: str) -> SymptomAnalysisResult:
    """Analyzes symptoms given medical context and returns conditions & advice."""
    if not settings.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is missing")

    prompt = f"Patient reports the following symptoms: {', '.join(symptoms)}.\n\n"
    prompt += f"Reference Context:\n{medical_context}\n\n"
    prompt += "Provide an analysis."

    response = instructor_client.chat.completions.create(
        model="llama3-70b-8192",
        response_model=SymptomAnalysisResult,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT_SYMPTOMS},
            {"role": "user", "content": prompt}
        ]
    )
    return response

def summarize_report(extracted_params: List[dict], medical_context: str) -> str:
    """Generates a patient-friendly summary of the report."""
    if not settings.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is missing")

    prompt = f"Extracted Lab Parameters:\n{extracted_params}\n\n"
    prompt += f"Reference Context:\n{medical_context}\n\n"
    prompt += "Provide a summary for the patient."

    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT_REPORT_SUMMARY},
            {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message.content
