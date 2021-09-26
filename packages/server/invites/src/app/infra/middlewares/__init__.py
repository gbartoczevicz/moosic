from fastapi.param_functions import Depends
from fastapi.security.oauth2 import OAuth2PasswordBearer
from ....adapters.providers import jwtProvider
from .ensure_authenticated import EnsureIsAuthenticated


ensure_is_authenticated = EnsureIsAuthenticated(jwtProvider)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def ensure_authenticated(token: str = Depends(oauth2_scheme)):
  return ensure_is_authenticated.execute(token)
