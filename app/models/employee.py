from sqlalchemy import Column, Integer, String, Float, Date
from app.database.base import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(String, unique=True, nullable=False)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    department = Column(String)

    designation = Column(String)

    salary = Column(Float)

    joining_date = Column(Date)

    status = Column(String, default="Active")