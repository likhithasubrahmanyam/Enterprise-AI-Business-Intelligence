from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.customer import Customer
from app.models.product import Product
from app.models.sale import Sale


class DashboardRepository:

    def get_dashboard_summary(
        self,
        db: Session
    ):

        total_employees = db.query(Employee).count()

        total_customers = db.query(Customer).count()

        total_products = db.query(Product).count()

        total_sales = db.query(Sale).count()

        total_revenue = (
            db.query(func.sum(Sale.total_amount))
            .scalar()
            or 0
        )

        low_stock_products = (
            db.query(Product)
            .filter(
                Product.stock_quantity <= Product.reorder_level
            )
            .count()
        )

        return {
            "total_employees": total_employees,
            "total_customers": total_customers,
            "total_products": total_products,
            "total_sales": total_sales,
            "total_revenue": total_revenue,
            "low_stock_products": low_stock_products,
        }