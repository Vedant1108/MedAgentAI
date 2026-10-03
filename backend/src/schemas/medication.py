from pydantic import BaseModel
from typing import List
from uuid import UUID
from datetime import datetime

class MedicationCreate(BaseModel):
    name: str
    dose: str
    frequency: str

class ReminderOut(BaseModel):
    id: UUID
    reminder_time: datetime
    is_taken: bool

    class Config:
        from_attributes = True

class MedicationOut(BaseModel):
    id: UUID
    name: str
    dose: str
    frequency: str
    is_active: bool
    reminders: List[ReminderOut] = []

    class Config:
        from_attributes = True
