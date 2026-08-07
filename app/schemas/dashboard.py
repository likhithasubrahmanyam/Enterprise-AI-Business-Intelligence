from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_employees: int
    total_customers: int
    total_products: int
    total_sales: int
    total_revenue: float
    low_stock_products: int