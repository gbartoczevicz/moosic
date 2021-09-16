from pydantic import BaseModel, Field


class UserAuth(BaseModel):
  user_id: str = Field(..., alias='userId')
