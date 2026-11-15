from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.customer import (
    CustomerCreate,
    CustomerUpdate,
    CustomerResponse,
)
from app.services.customer_service import CustomerService
from app.core.security import get_current_user

router = APIRouter()

service = CustomerService()


@router.post("/", response_model=CustomerResponse)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return service.create_customer(db, customer)


@router.get("/", response_model=list[CustomerResponse])
def get_all_customers(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return service.get_all_customers(db)


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    customer = service.get_customer_by_id(db, customer_id)

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    return customer


@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(
    customer_id: int,
    customer: CustomerUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_customer = service.update_customer(
        db,
        customer_id,
        customer,
    )

    if updated_customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    return updated_customer


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    deleted_customer = service.delete_customer(
        db,
        customer_id,
    )

    if deleted_customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found",
        )

    return {
        "message": "Customer deleted successfully"
    }