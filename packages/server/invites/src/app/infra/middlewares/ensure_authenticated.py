from fastapi import HTTPException
from ....ports.providers import JwtProvider
from ....domain.entities import UserAuth


class EnsureIsAuthenticated:

  def __init__(self, jwtProvider: JwtProvider) -> None:
    self.__jwtProvider: JwtProvider = jwtProvider

  def execute(self, token: str) -> UserAuth:
    try:
      return UserAuth(**self.__jwtProvider.verify(token))
    except:
      raise HTTPException(status_code=403)

