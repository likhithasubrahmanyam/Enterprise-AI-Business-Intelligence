from datetime import date
from pydantic import BaseModel, EmailStr


class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str
    designation: str
    salary: float
    joining_date: date


class EmployeeUpdate(BaseModel):
    full_name: str
    email: EmailStr
    department: str
    designation: str
    salary: float
    joining_date: date
    status: str


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: EmailStr
    department: str
    designation: str
    salary: float
    joining_date: date
    status: str

    class Config:
        from_attributes = True