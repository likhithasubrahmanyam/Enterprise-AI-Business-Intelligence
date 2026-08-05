from sqlalchemy.orm import Session

from app.repositories.employee_repository import EmployeeRepository
from app.schemas.employee import EmployeeCreate, EmployeeUpdate


class EmployeeService:

    def __init__(self):
        self.repository = EmployeeRepository()

    def create_employee(
        self,
        db: Session,
        employee: EmployeeCreate
    ):
        return self.repository.create_employee(
            db,
            employee
        )

    def get_all_employees(
        self,
        db: Session
    ):
        return self.repository.get_all_employees(db)

    def get_employee_by_id(
        self,
        db: Session,
        employee_id: int
    ):
        return self.repository.get_employee_by_id(
            db,
            employee_id
        )

    def update_employee(
        self,
        db: Session,
        employee_id: int,
        employee: EmployeeUpdate
    ):
        return self.repository.update_employee(
            db,
            employee_id,
            employee
        )

    def delete_employee(
        self,
        db: Session,
        employee_id: int
    ):
        return self.repository.delete_employee(
            db,
            employee_id
        )