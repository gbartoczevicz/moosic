from fastapi import APIRouter
from fastapi.param_functions import Depends

from ..middlewares import ensure_authenticated

auth_test = APIRouter(prefix="/auth_test")

@auth_test.get("")
async def create(auth_user = Depends(ensure_authenticated)):
  return auth_user
