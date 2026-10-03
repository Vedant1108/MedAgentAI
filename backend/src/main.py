from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.api import auth, users, reports, symptoms, medications

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="MedAgent REST API with JWT Authentication",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(symptoms.router, prefix="/api/symptoms", tags=["Symptoms"])
app.include_router(medications.router, prefix="/api/medications", tags=["Medications"])

@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "app": settings.PROJECT_NAME}
