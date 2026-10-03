from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from src.models import User, Medication, Reminder
from src.schemas.medication import MedicationCreate, MedicationOut, ReminderOut
from src.api.deps import get_current_user, get_db
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/", response_model=List[MedicationOut])
def get_medications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Medication).filter(Medication.user_id == current_user.id, Medication.is_active == True).all()

@router.post("/", response_model=MedicationOut)
def add_medication(med_in: MedicationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_med = Medication(
        user_id=current_user.id,
        name=med_in.name,
        dose=med_in.dose,
        frequency=med_in.frequency,
        is_active=True
    )
    db.add(new_med)
    db.commit()
    db.refresh(new_med)
    
    # Simulate adding a reminder for tomorrow
    new_reminder = Reminder(
        medication_id=new_med.id,
        user_id=current_user.id,
        reminder_time=datetime.utcnow() + timedelta(days=1),
        is_taken=False
    )
    db.add(new_reminder)
    db.commit()
    db.refresh(new_med)
    
    return new_med

@router.put("/reminders/{reminder_id}/take", response_model=ReminderOut)
def take_medication(reminder_id: uuid.UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    reminder = db.query(Reminder).filter(Reminder.id == reminder_id, Reminder.user_id == current_user.id).first()
    if not reminder:
        raise HTTPException(status_code=404, detail="Reminder not found")
    
    reminder.is_taken = True
    db.commit()
    db.refresh(reminder)
    return reminder

@router.delete("/{med_id}")
def delete_medication(med_id: uuid.UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    med = db.query(Medication).filter(Medication.id == med_id, Medication.user_id == current_user.id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Medication not found")
    
    med.is_active = False
    db.commit()
    return {"status": "success"}
