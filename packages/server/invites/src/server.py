from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from .app.infra.routes import auth_test


app = FastAPI()

app.include_router(auth_test)
