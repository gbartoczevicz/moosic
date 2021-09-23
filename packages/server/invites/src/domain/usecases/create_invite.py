from ..entities import Invite
from ...app.infra.database.fakes import FakeInvitesRepo


class CreateInviteUseCase:

  def __init__(self, invites_repo: FakeInvitesRepo) -> None:
    self.__invites_repo: FakeInvitesRepo = invites_repo

  def execute(self, invite: Invite) -> Invite:
    return self.__invites_repo.save(invite)
