from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.security.oauth2 import OAuth2PasswordBearer
from ....domain.usecases import set_session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def ensure_authenticated(token: str = Depends(oauth2_scheme)):
  user_auth = set_session.execute(token)

  if user_auth is None:
    raise HTTPException(status_code=403)

  return user_auth
