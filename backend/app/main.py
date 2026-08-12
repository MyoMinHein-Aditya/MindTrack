from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.middleware.audit import AuditLogMiddleware

app = FastAPI(
    title="MindTrack API",
    description="Early well-being monitoring and support-coordination system.",
    version="1.0.0"
)

app.add_middleware(AuditLogMiddleware)

# CORS Configuration
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

from app.api import auth, assessment, counselor, intervention, analytics
from app.api.endpoints import checkins

@app.get("/")
def read_root():
    return {"message": "Welcome to MindTrack API"}

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(assessment.router, prefix="/api/assessments", tags=["assessments"])
app.include_router(counselor.router, prefix="/api/counselor", tags=["counselor"])
app.include_router(intervention.router, prefix="/api/interventions", tags=["interventions"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(checkins.router, prefix="/api/checkins", tags=["checkins"])



