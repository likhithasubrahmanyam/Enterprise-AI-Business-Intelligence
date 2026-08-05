from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate


class EmployeeRepository:

    def create_employee(
        self,
        db: Session,
        employee: EmployeeCreate
    ):

        db_employee = Employee(
            employee_id=employee.employee_id,
            full_name=employee.full_name,
            email=employee.email,
            department=employee.department,
            designation=employee.designation,
            salary=employee.salary,
            joining_date=employee.joining_date
        )

        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)

        return db_employee

    def get_all_employees(
        self,
        db: Session
    ):
        return db.query(Employee).all()

    def get_employee_by_id(
        self,
        db: Session,
        employee_id: int
    ):
        return (
            db.query(Employee)
            .filter(Employee.id == employee_id)
            .first()
        )

    def update_employee(
        self,
        db: Session,
        employee_id: int,
        employee: EmployeeUpdate
    ):

        db_employee = (
            db.query(Employee)
            .filter(Employee.id == employee_id)
            .first()
        )

        if db_employee is None:
            return None

        db_employee.full_name = employee.full_name
        db_employee.email = employee.email
        db_employee.department = employee.department
        db_employee.designation = employee.designation
        db_employee.salary = employee.salary
        db_employee.joining_date = employee.joining_date
        db_employee.status = employee.status

        db.commit()
        db.refresh(db_employee)

        return db_employee

    def delete_employee(
        self,
        db: Session,
        employee_id: int
    ):

        db_employee = (
            db.query(Employee)
            .filter(Employee.id == employee_id)
            .first()
        )

        if db_employee is None:
            return None

        db.delete(db_employee)
        db.commit()

        return db_employee