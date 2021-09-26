from ..entities import Invite
from ...ports.database import InvitesRepo


class CreateInviteUseCase:

  def __init__(self, invites_repo: InvitesRepo) -> None:
    self.__invites_repo: InvitesRepo = invites_repo

  def execute(self, invite: Invite) -> Invite:
    return self.__invites_repo.save(invite)
