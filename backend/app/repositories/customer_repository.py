from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate


class CustomerRepository:

    def create_customer(self, db: Session, customer: CustomerCreate):

        db_customer = Customer(**customer.model_dump())

        db.add(db_customer)
        db.commit()
        db.refresh(db_customer)

        return db_customer

    def get_all_customers(self, db: Session):

        return db.query(Customer).all()

    def get_customer_by_id(self, db: Session, customer_id: int):

        return (
            db.query(Customer)
            .filter(Customer.id == customer_id)
            .first()
        )

    def update_customer(
        self,
        db: Session,
        customer_id: int,
        customer: CustomerUpdate,
    ):

        db_customer = self.get_customer_by_id(db, customer_id)

        if db_customer is None:
            return None

        for key, value in customer.model_dump().items():
            setattr(db_customer, key, value)

        db.commit()
        db.refresh(db_customer)

        return db_customer

    def delete_customer(self, db: Session, customer_id: int):

        db_customer = self.get_customer_by_id(db, customer_id)

        if db_customer is None:
            return None

        db.delete(db_customer)
        db.commit()

        return db_customer