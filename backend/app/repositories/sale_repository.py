from sqlalchemy.orm import Session

from app.models.sale import Sale


class SaleRepository:

    def create_sale(
        self,
        db: Session,
        sale: Sale
    ):
        db.add(sale)
        db.commit()
        db.refresh(sale)
        return sale

    def get_all_sales(
        self,
        db: Session
    ):
        return db.query(Sale).all()

    def get_sale_by_id(
        self,
        db: Session,
        sale_id: int
    ):
        return (
            db.query(Sale)
            .filter(Sale.id == sale_id)
            .first()
        )

    def delete_sale(
        self,
        db: Session,
        sale_id: int
    ):
        sale = self.get_sale_by_id(
            db,
            sale_id
        )

        if sale:
            db.delete(sale)
            db.commit()

        return sale