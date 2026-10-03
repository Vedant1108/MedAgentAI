import sys
import os
import uuid
from datetime import datetime, timedelta

# Add the backend directory to path so 'src' module can be found
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from src.db.database import SessionLocal, engine
from src.models import Base, User, Report, ReportValue, Symptom, Medication, Reminder, AuditLog

def seed_db():
    # Only run this if we're sure we want to recreate everything
    print("Dropping and recreating all tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        print("Seeding Users...")
        user_id = uuid.uuid4()
        user = User(
            id=user_id,
            email="john.doe@example.com",
            password_hash="hashed_password_123",
            full_name="John Doe",
            dietary_preferences={"diet": "vegetarian"},
            pre_existing_conditions=["Hypertension", "Non-smoker"]
        )
        db.add(user)
        db.commit()

        print("Seeding Reports & Values...")
        report_id = uuid.uuid4()
        report = Report(
            id=report_id,
            user_id=user_id,
            title="Comprehensive Blood Panel",
            report_date=datetime.utcnow().date() - timedelta(days=34),
            ai_summary="Your Vitamin D levels are significantly low (14 ng/mL). Total Cholesterol is elevated (245 mg/dL)."
        )
        db.add(report)
        db.commit()

        values = [
            ReportValue(report_id=report_id, parameter_name="Hemoglobin", value=13.8, unit="g/dL", reference_range="13.0 - 17.0", status="normal"),
            ReportValue(report_id=report_id, parameter_name="Vitamin D", value=14.0, unit="ng/mL", reference_range="30.0 - 100.0", status="low"),
            ReportValue(report_id=report_id, parameter_name="Cholesterol (Total)", value=245.0, unit="mg/dL", reference_range="< 200", status="high"),
        ]
        db.add_all(values)
        
        print("Seeding Symptoms...")
        symptom = Symptom(
            user_id=user_id,
            symptoms_list=["Headache", "Fever"],
            possible_conditions=["Common Cold", "Seasonal Allergies"],
            ai_advice="This appears to be a mild viral infection. Rest and hydrate."
        )
        db.add(symptom)

        print("Seeding Medications & Reminders...")
        med_id = uuid.uuid4()
        medication = Medication(
            id=med_id,
            user_id=user_id,
            name="Vitamin D3",
            dose="2000 IU",
            frequency="Daily"
        )
        db.add(medication)
        db.commit()

        reminder = Reminder(
            medication_id=med_id,
            user_id=user_id,
            reminder_time=datetime.utcnow() + timedelta(hours=8),
            is_taken=False
        )
        db.add(reminder)
        db.commit()

        print("Seed complete!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
