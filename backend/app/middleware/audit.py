import json
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.db.database import SessionLocal
from app.models.activity import AuditLog

class AuditLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # We only log mutating requests on specific sensitive endpoints for the MVP
        sensitive_paths = ["/api/counselor/alerts", "/api/interventions/assign"]
        method = request.method
        
        # Proceed with request
        response = await call_next(request)
        
        if method in ["POST", "PUT", "DELETE"] and any(p in request.url.path for p in sensitive_paths):
            # In a real system, we'd extract the user from the request state (set by Auth middleware)
            # For this prototype, we'll log the action itself.
            db = SessionLocal()
            try:
                log = AuditLog(
                    action=f"{method} {request.url.path}",
                    target="System",
                    metadata_json=json.dumps({"status_code": response.status_code})
                )
                db.add(log)
                db.commit()
            except Exception:
                pass
            finally:
                db.close()
                
        return response
