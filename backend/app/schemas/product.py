from pydantic import BaseModel


class ProductCreate(BaseModel):
    product_code: str
    product_name: str
    category: str
    description: str
    price: float
    stock_quantity: int
    reorder_level: int
    supplier: str


class ProductUpdate(BaseModel):
    product_name: str
    category: str
    description: str
    price: float
    stock_quantity: int
    reorder_level: int
    supplier: str


class ProductResponse(BaseModel):
    id: int
    product_code: str
    product_name: str
    category: str
    description: str
    price: float
    stock_quantity: int
    reorder_level: int
    supplier: str

    class Config:
        from_attributes = True