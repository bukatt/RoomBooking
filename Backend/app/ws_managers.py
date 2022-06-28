from fastapi import WebSocket
from typing import List
from schema import room_booking as room_booking_schema
from fastapi.encoders import jsonable_encoder

class RoomBookingWSManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, booking: room_booking_schema.RoomBooking):
        booking_json = jsonable_encoder(booking)
        for connection in self.active_connections:
            print("Broadcasting")
            await connection.send_json(booking_json)

roomBookingWSManager = RoomBookingWSManager()