# RoomBooking
An application for booking rooms by the hour

## Start Backend

### Start Docker
docker-compose up

### Activate Virtual Env
.\env\Scripts\activate

### migration
alembic upgrade head

### Seed initial data
python initial_data.py

### Start api
uvicorn main:app --host 127.0.0.1 --port 8080

## Start frontend
npm start

## Local docs URL
http://127.0.0.1:8080/docs#/default