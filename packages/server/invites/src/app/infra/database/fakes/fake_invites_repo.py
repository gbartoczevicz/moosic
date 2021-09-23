from typing import List

from .....domain.entities import Invite


class FakeInvitesRepo:

  def __init__(self) -> None:
      self.__invites: List[Invite] = []

  def save(self, invite: Invite) -> Invite:
    index = next((i for i, to_find_invite in enumerate(self.__invites) if to_find_invite.id == invite.id), None)

    if index is None:
      self.__invites.append(invite)
    else:
      self.__invites[index] = invite

    return invite
