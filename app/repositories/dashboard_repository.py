from sqlalchemy import func, extract
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
            "total_revenue": float(total_revenue),
            "low_stock_products": low_stock_products,
        }

    def get_monthly_revenue(
        self,
        db: Session
    ):

        result = (
            db.query(
                extract("month", Sale.sale_date).label("month"),
                func.sum(Sale.total_amount).label("revenue")
            )
            .group_by(
                extract("month", Sale.sale_date)
            )
            .order_by(
                extract("month", Sale.sale_date)
            )
            .all()
        )

        months = [
            "",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]

        return [
            {
                "month": months[int(row.month)],
                "revenue": float(row.revenue)
            }
            for row in result
        ]

    def get_top_products(
        self,
        db: Session
    ):

        result = (
            db.query(
                Product.product_name.label("product_name"),
                func.sum(Sale.quantity).label("quantity_sold"),
                func.sum(Sale.total_amount).label("revenue")
            )
            .join(
                Product,
                Sale.product_id == Product.id
            )
            .group_by(
                Product.product_name
            )
            .order_by(
                func.sum(Sale.quantity).desc()
            )
            .all()
        )

        return [
            {
                "product_name": row.product_name,
                "quantity_sold": int(row.quantity_sold),
                "revenue": float(row.revenue)
            }
            for row in result
        ]

    def get_top_customers(
        self,
        db: Session
    ):

        result = (
            db.query(
                Customer.company_name.label("company_name"),
                func.count(Sale.id).label("total_orders"),
                func.sum(Sale.total_amount).label("revenue")
            )
            .join(
                Customer,
                Sale.customer_id == Customer.id
            )
            .group_by(
                Customer.company_name
            )
            .order_by(
                func.sum(Sale.total_amount).desc()
            )
            .all()
        )

        return [
            {
                "company_name": row.company_name,
                "total_orders": int(row.total_orders),
                "revenue": float(row.revenue)
            }
            for row in result
        ]

    def get_top_employees(
        self,
        db: Session
    ):

        result = (
            db.query(
                Employee.full_name.label("employee_name"),
                func.count(Sale.id).label("sales_count"),
                func.sum(Sale.total_amount).label("revenue")
            )
            .join(
                Employee,
                Sale.employee_id == Employee.id
            )
            .group_by(
                Employee.full_name
            )
            .order_by(
                func.sum(Sale.total_amount).desc()
            )
            .all()
        )

        return [
            {
                "employee_name": row.employee_name,
                "sales_count": int(row.sales_count),
                "revenue": float(row.revenue)
            }
            for row in result
        ]

    def get_low_stock_products(
        self,
        db: Session
    ):

        result = (
            db.query(
                Product.product_name.label("product_name"),
                Product.stock_quantity.label("stock_quantity"),
                Product.reorder_level.label("reorder_level")
            )
            .filter(
                Product.stock_quantity <= Product.reorder_level
            )
            .order_by(
                Product.stock_quantity.asc()
            )
            .all()
        )

        return [
            {
                "product_name": row.product_name,
                "stock_quantity": int(row.stock_quantity),
                "reorder_level": int(row.reorder_level)
            }
            for row in result
        ]

    def get_sales_trend(
        self,
        db: Session
    ):

        result = (
            db.query(
                Sale.sale_date.label("date"),
                func.count(Sale.id).label("sales"),
                func.sum(Sale.total_amount).label("revenue")
            )
            .group_by(
                Sale.sale_date
            )
            .order_by(
                Sale.sale_date
            )
            .all()
        )

        return [
            {
                "date": str(row.date),
                "sales": int(row.sales),
                "revenue": float(row.revenue)
            }
            for row in result
        ]