from typing import Optional
from ...ports.providers import JwtProvider
from ...domain.entities import UserAuth


class SetSession:

  def __init__(self, jwtProvider: JwtProvider) -> None:
    self.__jwtProvider: JwtProvider = jwtProvider

  def execute(self, token: str) -> Optional[UserAuth]:
    try:
      return UserAuth(**self.__jwtProvider.verify(token))
    except:
      return None

