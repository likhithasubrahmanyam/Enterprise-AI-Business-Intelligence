from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.sale import Sale
from app.models.product import Product
from app.repositories.sale_repository import SaleRepository
from app.schemas.sale import SaleCreate


class SaleService:

    def __init__(self):
        self.repository = SaleRepository()

    def create_sale(
        self,
        db: Session,
        sale: SaleCreate
    ):

        product = (
            db.query(Product)
            .filter(Product.id == sale.product_id)
            .first()
        )

        if product is None:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        if sale.quantity <= 0:
            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than zero"
            )

        if product.stock_quantity < sale.quantity:
            raise HTTPException(
                status_code=400,
                detail="Insufficient stock"
            )

        unit_price = product.price

        total_amount = unit_price * sale.quantity

        product.stock_quantity -= sale.quantity

        db_sale = Sale(
            employee_id=sale.employee_id,
            customer_id=sale.customer_id,
            product_id=sale.product_id,
            quantity=sale.quantity,
            unit_price=unit_price,
            total_amount=total_amount,
        )

        return self.repository.create_sale(
            db,
            db_sale
        )

    def get_all_sales(
        self,
        db: Session
    ):
        return self.repository.get_all_sales(db)

    def get_sale_by_id(
        self,
        db: Session,
        sale_id: int
    ):
        return self.repository.get_sale_by_id(
            db,
            sale_id
        )

    def delete_sale(
        self,
        db: Session,
        sale_id: int
    ):
        return self.repository.delete_sale(
            db,
            sale_id
        )