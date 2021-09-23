from .create_invite import CreateInviteUseCase
from ...app.infra.database.fakes import FakeInvitesRepo


create_invite_usecase = CreateInviteUseCase(FakeInvitesRepo())
