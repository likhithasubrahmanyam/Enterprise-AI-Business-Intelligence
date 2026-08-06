from sqlalchemy.orm import Session

from app.repositories.product_repository import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate


class ProductService:

    def __init__(self):
        self.repository = ProductRepository()

    def create_product(
        self,
        db: Session,
        product: ProductCreate
    ):
        return self.repository.create_product(
            db,
            product
        )

    def get_all_products(
        self,
        db: Session
    ):
        return self.repository.get_all_products(db)

    def get_product_by_id(
        self,
        db: Session,
        product_id: int
    ):
        return self.repository.get_product_by_id(
            db,
            product_id
        )

    def update_product(
        self,
        db: Session,
        product_id: int,
        product: ProductUpdate
    ):
        return self.repository.update_product(
            db,
            product_id,
            product
        )

    def delete_product(
        self,
        db: Session,
        product_id: int
    ):
        return self.repository.delete_product(
            db,
            product_id
        )