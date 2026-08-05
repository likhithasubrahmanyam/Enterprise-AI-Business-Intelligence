from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.services.auth_service import hash_password


class UserService:

    def __init__(self):
        self.repository = UserRepository()

    def register_user(
        self,
        db: Session,
        user_data: UserCreate
    ):

        existing_user = self.repository.get_by_email(
            db,
            user_data.email
        )

        if existing_user:
            raise Exception("Email already registered")

        new_user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            password=hash_password(user_data.password),
            role="employee"
        )

        return self.repository.create_user(
            db,
            new_user
        )