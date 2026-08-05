from datetime import date
from pydantic import BaseModel, EmailStr


class CustomerCreate(BaseModel):
    customer_code: str
    company_name: str
    contact_person: str
    email: EmailStr
    phone: str
    city: str
    country: str


class CustomerUpdate(BaseModel):
    company_name: str | None = None
    contact_person: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    city: str | None = None
    country: str | None = None


class CustomerResponse(BaseModel):
    id: int
    customer_code: str
    company_name: str
    contact_person: str
    email: EmailStr
    phone: str
    city: str
    country: str

    class Config:
        from_attributes = True