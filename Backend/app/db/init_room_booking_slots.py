from datetime import time, datetime


available_booking_slots = [
    datetime.strptime("08:00", '%H:%M').time(),
    datetime.strptime("09:00", '%H:%M').time(),
    datetime.strptime("10:00", '%H:%M').time(),
    datetime.strptime("11:00", '%H:%M').time(),
    datetime.strptime("12:00", '%H:%M').time(),
    datetime.strptime("13:00", '%H:%M').time(),
    datetime.strptime("14:00", '%H:%M').time(),
    datetime.strptime("15:00", '%H:%M').time(),
    datetime.strptime("16:00", '%H:%M').time(),
    datetime.strptime("17:00", '%H:%M').time(),
    datetime.strptime("18:00", '%H:%M').time()
]