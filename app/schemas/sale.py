from datetime import datetime
from pydantic import BaseModel


class SaleCreate(BaseModel):
    employee_id: int
    customer_id: int
    product_id: int
    quantity: int


class SaleUpdate(BaseModel):
    quantity: int


class SaleResponse(BaseModel):
    id: int
    employee_id: int
    customer_id: int
    product_id: int
    quantity: int
    unit_price: float
    total_amount: float
    sale_date: datetime

    class Config:
        from_attributes = True