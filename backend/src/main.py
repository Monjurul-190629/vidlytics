from contextlib import asynccontextmanager
from typing import Union

from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    # before app startup up
    yield
    # clean up


app = FastAPI(lifespan=lifespan)


@app.get("/")
def read_root():
    return {"Hello": "World my old friend I did it"}


@app.get("/healthz")
def read_api_health():
    return {"status": "ok"}