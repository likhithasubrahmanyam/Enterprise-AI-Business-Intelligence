from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


class ProductRepository:

    def create_product(
        self,
        db: Session,
        product: ProductCreate
    ):
        db_product = Product(**product.model_dump())

        db.add(db_product)
        db.commit()
        db.refresh(db_product)

        return db_product

    def get_all_products(
        self,
        db: Session
    ):
        return db.query(Product).all()

    def get_product_by_id(
        self,
        db: Session,
        product_id: int
    ):
        return (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

    def update_product(
        self,
        db: Session,
        product_id: int,
        product: ProductUpdate
    ):
        db_product = self.get_product_by_id(
            db,
            product_id
        )

        if db_product is None:
            return None

        for key, value in product.model_dump().items():
            setattr(db_product, key, value)

        db.commit()
        db.refresh(db_product)

        return db_product

    def delete_product(
        self,
        db: Session,
        product_id: int
    ):
        db_product = self.get_product_by_id(
            db,
            product_id
        )

        if db_product is None:
            return None

        db.delete(db_product)
        db.commit()

        return db_product