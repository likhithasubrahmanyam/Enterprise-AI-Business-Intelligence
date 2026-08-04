from fastapi import FastAPI

app = FastAPI(
    title="Enterprise AI Business Intelligence API",
    description="AI-powered Business Intelligence System",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Enterprise AI Business Intelligence System"
    }
