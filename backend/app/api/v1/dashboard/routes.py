from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import get_current_user
from app.schemas.dashboard import (
    DashboardSummary,
    MonthlyRevenue,
    TopProduct,
    TopCustomer,
    TopEmployee,
    LowStockProduct,
    SalesTrend,
)
from app.services.dashboard_service import DashboardService


router = APIRouter()

service = DashboardService()


@router.get(
    "/summary",
    response_model=DashboardSummary
)
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return service.get_dashboard_summary(db)


@router.get(
    "/monthly-revenue",
    response_model=list[MonthlyRevenue]
)
def get_monthly_revenue(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return service.get_monthly_revenue(db)


@router.get(
    "/top-products",
    response_model=list[TopProduct]
)
def get_top_products(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return service.get_top_products(db)


@router.get(
    "/top-customers",
    response_model=list[TopCustomer]
)
def get_top_customers(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return service.get_top_customers(db)

@router.get(
    "/top-employees",
    response_model=list[TopEmployee]
)
def get_top_employees(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return service.get_top_employees(db)

@router.get(
    "/low-stock-products",
    response_model=list[LowStockProduct]
)
def get_low_stock_products(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return service.get_low_stock_products(db)

@router.get(
    "/sales-trend",
    response_model=list[SalesTrend]
)
def get_sales_trend(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return service.get_sales_trend(db)