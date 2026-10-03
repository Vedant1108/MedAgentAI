from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from src.models import User, Report, ReportValue
from src.schemas.report import ReportOut
from src.api.deps import get_current_user, get_db
import uuid

router = APIRouter()

@router.get("/", response_model=List[ReportOut])
def get_reports(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Report).filter(Report.user_id == current_user.id).all()

@router.get("/{report_id}", response_model=ReportOut)
def get_report(report_id: uuid.UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id, Report.user_id == current_user.id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report

@router.post("/upload", response_model=ReportOut)
async def upload_report(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Read file bytes
    file_bytes = await file.read()
    
    # 1. OCR Extraction
    try:
        from src.ai.ocr import extract_text_from_pdf
        ocr_text = extract_text_from_pdf(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read PDF: {str(e)}")

    # 2. LLM Extraction
    try:
        from src.ai.llm import extract_report_data
        extraction_result = extract_report_data(ocr_text)
        extracted_params = extraction_result.parameters
    except Exception as e:
        # Fallback if API key is missing or extraction fails
        extracted_params = []
        print(f"Extraction failed: {str(e)}")
    
    # Optional 3: Generate Summary
    try:
        if extracted_params:
            from src.ai.llm import summarize_report
            # Just pass the dict representations
            params_dict = [p.dict() for p in extracted_params]
            ai_summary = summarize_report(params_dict, "No specific context provided for summary.")
        else:
            ai_summary = "Could not extract parameters from this report."
    except Exception as e:
        ai_summary = "Summary generation failed."

    new_report = Report(
        user_id=current_user.id,
        title=f"Analysis: {file.filename}",
        report_date=datetime.utcnow().date(),
        ai_summary=ai_summary
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    # Add the extracted values to the database
    db_values = []
    for param in extracted_params:
        db_values.append(ReportValue(
            report_id=new_report.id,
            parameter_name=param.parameter_name,
            value=param.value,
            unit=param.unit,
            reference_range=param.reference_range,
            status=param.status
        ))
    
    if db_values:
        db.add_all(db_values)
        db.commit()
    
    db.refresh(new_report)
    return new_report
