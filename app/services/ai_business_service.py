
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.models.sale import Sale
from app.models.product import Product
from app.models.customer import Customer
from app.models.employee import Employee


class AIBusinessService:

    def get_business_context(self, db: Session) -> dict:
        """Read business summaries from PostgreSQL."""

        # Overall business summary
        total_sales = db.query(
            func.count(Sale.id)
        ).scalar() or 0

        total_revenue = db.query(
            func.coalesce(func.sum(Sale.total_amount), 0)
        ).scalar() or 0

        total_customers = db.query(
            func.count(Customer.id)
        ).scalar() or 0

        total_employees = db.query(
            func.count(Employee.id)
        ).scalar() or 0

        total_products = db.query(
            func.count(Product.id)
        ).scalar() or 0

        # Best-selling products
        top_products = (
            db.query(
                Product.product_name,
                func.sum(Sale.quantity).label("units_sold"),
                func.sum(Sale.total_amount).label("revenue"),
            )
            .join(Sale, Sale.product_id == Product.id)
            .group_by(Product.id, Product.product_name)
            .order_by(desc("units_sold"))
            .limit(5)
            .all()
        )

        # Top customers by spending
        top_customers = (
            db.query(
                Customer.company_name,
                func.sum(Sale.total_amount).label("total_spent"),
            )
            .join(Sale, Sale.customer_id == Customer.id)
            .group_by(Customer.id, Customer.company_name)
            .order_by(desc("total_spent"))
            .limit(5)
            .all()
        )

        # Top employees by sales revenue
        top_employees = (
            db.query(
                Employee.full_name,
                func.sum(Sale.total_amount).label("revenue"),
            )
            .join(Sale, Sale.employee_id == Employee.id)
            .group_by(Employee.id, Employee.full_name)
            .order_by(desc("revenue"))
            .limit(5)
            .all()
        )

        # Products at or below their reorder level
        low_stock_products = (
            db.query(
                Product.product_name,
                Product.stock_quantity,
                Product.reorder_level,
            )
            .filter(
                Product.stock_quantity <= Product.reorder_level
            )
            .order_by(Product.stock_quantity.asc())
            .limit(10)
            .all()
        )

        return {
            "summary": {
                "total_sales_transactions": int(total_sales),
                "total_revenue": round(float(total_revenue), 2),
                "total_customers": int(total_customers),
                "total_employees": int(total_employees),
                "total_products": int(total_products),
            },
            "top_products": [
                {
                    "product_name": row.product_name,
                    "units_sold": int(row.units_sold or 0),
                    "revenue": round(float(row.revenue or 0), 2),
                }
                for row in top_products
            ],
            "top_customers": [
                {
                    "company_name": row.company_name,
                    "total_spent": round(float(row.total_spent or 0), 2),
                }
                for row in top_customers
            ],
            "top_employees": [
                {
                    "employee_name": row.full_name,
                    "sales_revenue": round(float(row.revenue or 0), 2),
                }
                for row in top_employees
            ],
            "low_stock_products": [
                {
                    "product_name": row.product_name,
                    "stock_quantity": row.stock_quantity,
                    "reorder_level": row.reorder_level,
                }
                for row in low_stock_products
            ],
        }
