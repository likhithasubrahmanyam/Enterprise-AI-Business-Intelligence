from fastapi import FastAPI

from app.api.v1.auth.routes import router as auth_router
from app.api.v1.employees.routes import router as employee_router
from app.api.v1.customers.routes import router as customer_router

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

app.include_router(
    employee_router,
    prefix="/api/v1/employees",
    tags=["Employees"]
)

app.include_router(
    customer_router,
    prefix="/api/v1/customers",
    tags=["Customers"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to Enterprise AI Business Intelligence System"
    }