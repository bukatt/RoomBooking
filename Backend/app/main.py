from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from api import user_api, login_api, room_booking_api, room_api
from models import user
from fastapi.middleware.cors import CORSMiddleware
from api import ws_api
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_api.router)
app.include_router(login_api.router)
app.include_router(room_booking_api.router)
app.include_router(room_api.router)
app.include_router(ws_api.router)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/ws/room-bookings")
async def root():
    return {"message": "Root"}