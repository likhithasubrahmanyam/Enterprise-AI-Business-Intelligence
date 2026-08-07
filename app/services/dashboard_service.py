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