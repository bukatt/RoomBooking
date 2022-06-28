from sqlalchemy.orm import Session
from .init_companies import initial_companies
from crud import company as company_crud
from schema import room as room_schema
from schema import room_booking as booking_schema
from crud import room as room_crud
from .init_room_booking_slots import available_booking_slots
from crud import room_booking as booking_crud

def init_db(db: Session):
    for company in initial_companies:
        res = company_crud.get_company_by_name(db, company.company_name)
        if not res:
            company_crud.create_company(db, company)
    
    for x in range(1, 11):
        coke_name = "C" + str(x)
        pepsi_name = "P" + str(x)

        res_coke = room_crud.get_room_by_name(db, coke_name)
        res_pepsi = room_crud.get_room_by_name(db, pepsi_name)

        if not res_coke:
            coke_room = room_schema.RoomCreate(name = "C" + str(x), company_id = 1)
            room = room_crud.create_room(db, coke_room)
            for slot in available_booking_slots:
                booking = booking_schema.RoomBookingCreate(room_id = room.room_id, start_time=slot)
                booking_crud.create_room_booking(db, booking)
        
        if not res_pepsi:
            pepsi_room = room_schema.RoomCreate(name = "P" + str(x), company_id = 2)
            room = room_crud.create_room(db, pepsi_room)
            print(room.room_id)
            for slot in available_booking_slots:
                booking = booking_schema.RoomBookingCreate(room_id = room.room_id, start_time=slot)
                print(booking.room_id)
                booking_crud.create_room_booking(db, booking)
