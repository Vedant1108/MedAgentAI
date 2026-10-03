from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class SymptomCreate(BaseModel):
    symptoms: List[str]

class SymptomOut(BaseModel):
    id: UUID
    symptoms_list: List[str]
    possible_conditions: Optional[List[str]]
    ai_advice: Optional[str]
    checked_at: datetime

    class Config:
        from_attributes = True
