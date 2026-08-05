from sqlalchemy.orm import Session

from app.repositories.customer_repository import CustomerRepository
from app.schemas.customer import CustomerCreate, CustomerUpdate


class CustomerService:

    def __init__(self):
        self.repository = CustomerRepository()

    def create_customer(self, db: Session, customer: CustomerCreate):
        return self.repository.create_customer(db, customer)

    def get_all_customers(self, db: Session):
        return self.repository.get_all_customers(db)

    def get_customer_by_id(self, db: Session, customer_id: int):
        return self.repository.get_customer_by_id(db, customer_id)

    def update_customer(
        self,
        db: Session,
        customer_id: int,
        customer: CustomerUpdate,
    ):
        return self.repository.update_customer(
            db,
            customer_id,
            customer,
        )

    def delete_customer(self, db: Session, customer_id: int):
        return self.repository.delete_customer(
            db,
            customer_id,
        )