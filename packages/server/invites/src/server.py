from fastapi import FastAPI
from dotenv import load_dotenv
from .app.infra.routes import create_invite_router


load_dotenv()

app = FastAPI()

app.include_router(create_invite_router)
