from fastapi import FastAPI

from app.api.v1.auth.routes import router as auth_router

app = FastAPI(
    title="Enterprise AI Business Intelligence API",
    description="AI-powered Business Intelligence System",
    version="1.0.0"
)

app.include_router(
    auth_router,
    prefix="/api/v1/auth",
    tags=["Authentication"]
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Enterprise AI Business Intelligence System"
    }