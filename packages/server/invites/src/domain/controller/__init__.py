from .create_invite import CreateInviteController
from ..usecases import create_invite_usecase

create_invite_controller = CreateInviteController(create_invite_usecase)
