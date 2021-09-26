from .jwt import JwtProviderImpl
from ...utils import get_env_or_error


jwtProvider = JwtProviderImpl(get_env_or_error("JWT_SECRET"))
