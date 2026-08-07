from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import get_current_user
from app.schemas.dashboard import DashboardSummary
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