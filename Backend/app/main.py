from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from api import user_api, login
from models import user
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_api.router)
app.include_router(login.router)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
async def root():
    return {"message": "Hello World"}