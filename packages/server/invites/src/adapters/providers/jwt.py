import jwt
from ...ports.providers import JwtProvider


class JwtProviderImpl(JwtProvider):
  def __init__(self, secret: str) -> None:
    self._secret_ = secret

  def verify(self, token: str):
    return jwt.decode(token, self._secret_, algorithms=["HS256"])
