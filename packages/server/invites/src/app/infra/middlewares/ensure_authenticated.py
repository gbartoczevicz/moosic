from fastapi import HTTPException
from fastapi.param_functions import Depends
from fastapi.security.oauth2 import OAuth2PasswordBearer

from ....domain.entities import UserAuth

from ....providers import jwtProvider

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def ensure_authenticated(token: str = Depends(oauth2_scheme)) -> UserAuth:
  try:
    return UserAuth(**jwtProvider.verify(token))
  except:
    raise HTTPException(status_code=403)

