from abc import ABC, abstractmethod
from ...domain.entities import Invite


class InvitesRepo(ABC):

  @classmethod
  @abstractmethod
  def save(self, invite: Invite) -> Invite:
    pass
