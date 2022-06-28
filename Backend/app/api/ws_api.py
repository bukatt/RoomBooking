from fastapi import WebSocket, APIRouter, WebSocketDisconnect, Depends
import random
from ws_managers import roomBookingWSManager
from crud import room_booking as room_booking_crud
from crud import room as room_crud
from sqlalchemy.orm import Session
from db.db import get_db

router = APIRouter()

@router.websocket("/ws/room-booking")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    await roomBookingWSManager.connect(websocket)
    try:
        while(True):
            data = await websocket.receive_json()
            if data["company_id"]:
                rooms = room_crud.get_company_rooms(db, data["company_id"])
                await roomBookingWSManager.broadcast(rooms)
    except WebSocketDisconnect:
        roomBookingWSManager.disconnect(websocket)