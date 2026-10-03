from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import date, datetime

class ReportValueOut(BaseModel):
    id: UUID
    parameter_name: str
    value: float
    unit: Optional[str]
    reference_range: Optional[str]
    status: str

    class Config:
        from_attributes = True

class ReportOut(BaseModel):
    id: UUID
    title: str
    report_date: date
    ai_summary: Optional[str]
    values: List[ReportValueOut] = []

    class Config:
        from_attributes = True
