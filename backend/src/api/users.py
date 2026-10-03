from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.models import User, Report, Symptom, Medication
from src.schemas.user import UserOut
from src.api.deps import get_current_user, get_db

router = APIRouter()

@router.get("/me", response_model=UserOut)
def get_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/dashboard")
def get_dashboard_summary(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    report_count = db.query(Report).filter(Report.user_id == current_user.id).count()
    symptom_count = db.query(Symptom).filter(Symptom.user_id == current_user.id).count()
    meds_count = db.query(Medication).filter(Medication.user_id == current_user.id, Medication.is_active == True).count()
    
    return {
        "total_reports": report_count,
        "symptom_checks": symptom_count,
        "active_medications": meds_count,
        "health_streak": 28 # Mocked for now
    }
