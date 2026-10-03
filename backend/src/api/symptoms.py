from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from src.models import User, Symptom
from src.schemas.symptom import SymptomCreate, SymptomOut
from src.api.deps import get_current_user, get_db

router = APIRouter()

@router.get("/history", response_model=List[SymptomOut])
def get_symptom_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Symptom).filter(Symptom.user_id == current_user.id).order_by(Symptom.checked_at.desc()).all()

@router.post("/analyze", response_model=SymptomOut)
def analyze_symptoms(symptoms_in: SymptomCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    from src.ai.rag import query_medical_context
    from src.ai.llm import analyze_symptoms as llm_analyze
    
    # 1. RAG Retrieval
    query_text = " ".join(symptoms_in.symptoms)
    try:
        context_docs = query_medical_context([query_text], n_results=2)
        medical_context = "\n".join(context_docs) if context_docs else "No specific guidelines found."
    except Exception as e:
        medical_context = "Failed to retrieve context."

    # 2. AI Analysis
    try:
        analysis = llm_analyze(symptoms_in.symptoms, medical_context)
        possible_conditions = analysis.possible_conditions
        ai_advice = analysis.ai_advice
    except Exception as e:
        possible_conditions = []
        ai_advice = f"AI analysis unavailable. Error: {str(e)}"

    new_symptom = Symptom(
        user_id=current_user.id,
        symptoms_list=symptoms_in.symptoms,
        possible_conditions=possible_conditions,
        ai_advice=ai_advice
    )
    db.add(new_symptom)
    db.commit()
    db.refresh(new_symptom)
    
    return new_symptom
