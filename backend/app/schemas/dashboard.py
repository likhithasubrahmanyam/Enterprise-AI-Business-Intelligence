from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_employees: int
    total_customers: int
    total_products: int
    total_sales: int
    total_revenue: float
    low_stock_products: int

class MonthlyRevenue(BaseModel):
    month: str
    revenue: float

class TopProduct(BaseModel):
    product_name: str
    quantity_sold: int
    revenue: float

class TopCustomer(BaseModel):
    company_name: str
    total_orders: int
    revenue: float

class TopEmployee(BaseModel):
    employee_name: str
    sales_count: int
    revenue: float

class LowStockProduct(BaseModel):
    product_name: str
    stock_quantity: int
    reorder_level: int

class SalesTrend(BaseModel):
    date: str
    sales: int
    revenue: float