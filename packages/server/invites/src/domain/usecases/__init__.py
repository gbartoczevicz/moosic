from ..usecases.set_session import SetSession
from .create_invite import CreateInviteUseCase

from ...ports.database.fakes import FakeInvitesRepo
from ...adapters.providers import jwtProvider


create_invite_usecase = CreateInviteUseCase(FakeInvitesRepo())
set_session = SetSession(jwtProvider)
