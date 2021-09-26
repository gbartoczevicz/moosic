from .create_invite import CreateInviteUseCase
from ...ports.database.fakes import FakeInvitesRepo


create_invite_usecase = CreateInviteUseCase(FakeInvitesRepo())
