from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    def __init__(self):
        self.repository = DashboardRepository()

    def get_dashboard_summary(
        self,
        db: Session
    ):
        return self.repository.get_dashboard_summary(db)

    def get_monthly_revenue(
        self,
        db: Session
    ):
        return self.repository.get_monthly_revenue(db)

    def get_top_products(
        self,
        db: Session
    ):
        return self.repository.get_top_products(db)

    def get_top_customers(
        self,
        db: Session
    ):
        return self.repository.get_top_customers(db)

    def get_top_employees(
        self,
        db: Session
    ):
        return self.repository.get_top_employees(db)

    def get_low_stock_products(
        self,
        db: Session
    ):
        return self.repository.get_low_stock_products(db)

    def get_sales_trend(
        self,
        db: Session
    ):
        return self.repository.get_sales_trend(db)