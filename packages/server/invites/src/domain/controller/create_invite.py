from ..entities import Invite, Location
from ..usecases import CreateInviteUseCase


class CreateInviteController:

  def __init__(self, create_invite_usecase: CreateInviteUseCase) -> None:
    self.__create_invite_usecase: CreateInviteUseCase = create_invite_usecase

  def handle(self, request: dict):
    location: Location = {
      "latitude": request.get("latitude"),
      "longitude": request.get("longitude"),
      "postal_code": request.get("postal_code"),
      "address": request.get("address"),
      "address_number": request.get("address_number")
    }

    to_create_invite = {
      **request, "location": location
    }

    invite = Invite(**to_create_invite)

    return self.__create_invite_usecase.execute(invite)
