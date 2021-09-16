from .jwt import JwtProvider
from ..utils import get_env_or_error


jwtProvider = JwtProvider(get_env_or_error("JWT_SECRET"))
