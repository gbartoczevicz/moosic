

from abc import ABC, abstractmethod


class JwtProvider(ABC):

  @classmethod
  @abstractmethod
  def verify(self, token: str) -> dict:
    pass
