from fastapi import APIRouter
from fastapi.param_functions import Depends
from pydantic.main import BaseModel
from datetime import date

from ....domain.controller import create_invite_controller
from ..middlewares import ensure_authenticated


class Dto(BaseModel):
  date: date
  artist_id: str
  latitude: float
  longitude: float
  postal_code: str
  address: str
  address_number: int

create_invite_router = APIRouter()

@create_invite_router.post("/invites")
async def execute(request: Dto, auth_user = Depends(ensure_authenticated)):
  dto = {
    **request.__dict__,
    "establishment_id": auth_user.user_id
  }

  return create_invite_controller.handle(dto)
