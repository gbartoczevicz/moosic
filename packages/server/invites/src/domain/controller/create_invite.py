from ..entities import Invite
from ..usecases import CreateInviteUseCase


class CreateInviteController:

  def __init__(self, create_invite_usecase: CreateInviteUseCase) -> None:
    self.__create_invite_usecase: CreateInviteUseCase = create_invite_usecase

  def handle(self, request):
    invite = Invite(**request)

    return self.__create_invite_usecase.execute(invite)
