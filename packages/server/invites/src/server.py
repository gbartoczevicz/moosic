from fastapi import FastAPI

from .app.infra.routes import auth_test


app = FastAPI()

app.include_router(auth_test)
