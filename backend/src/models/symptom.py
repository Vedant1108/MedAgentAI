import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from src.db.database import Base

class Symptom(Base):
    __tablename__ = "symptoms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True, nullable=False)
    symptoms_list = Column(JSONB, nullable=False)
    ai_advice = Column(Text, nullable=True)
    possible_conditions = Column(JSONB, nullable=True)
    checked_at = Column(DateTime, index=True, default=datetime.utcnow)

    user = relationship("User", back_populates="symptoms")
