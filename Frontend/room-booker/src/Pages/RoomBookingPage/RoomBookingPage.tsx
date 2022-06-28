import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";
import Endpoints from "../../Endpoints/Endpoints";
import RoomBookingCard from "../../Components/RoomBookingCard/RoomBookingCard";
import { AppState } from "../../Models/State/AppState";
import { Room } from "../../Models/Room";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import { RoomSerializer } from "../../Serializers/RoomSerializer";
import './RoomBookingPage.css'

function RoomBookingPage() {
    const roomSerializer: RoomSerializer = new RoomSerializer();
    const { user } = useSelector((state: AppState) => state.auth)
    const [rooms, setRooms] = useState<Room[]>([])
    const ws: any = useRef(null);

    const getRooms = () => {
        return axios.get(Endpoints.rooms)
    }

    useEffect(() => {
        ws.connection = new WebSocket(Endpoints.roomsWS);
        if(ws?.connection){
            console.log("on ws")
            ws.connection.onmessage = (event: any) => {
                fetchRooms()
            };
        }

        fetchRooms()

      }, [])
    
    const fetchRooms = () => {
        getRooms().then(response => {
            const roomsData: Room[] = response.data.map((room: any) => roomSerializer.fromJson(room, user.user_id))
            setRooms(roomsData)
        })
    }
    
    const onUpdateCallback = () => {
        console.log("WS update")
        console.log(ws)
        if(ws?.connection){
            ws.connection.send(JSON.stringify({company_id: user.company_id}))
        }
    }
    
    return (
        <Container>
                <Card className={`legend mb-5`}>
                    <Card.Body>
                    <Card.Title>Legend:</Card.Title>
                        <Row>
                            <Col>
                                <Button variant="outline-primary">Available</Button>
                            </Col>
                            <Col>
                                <Button disabled variant="outline-secondary">Unavailable</Button>
                            </Col>
                            <Col>
                                <Button variant="outline-success">My Booking</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            <Row xs={1} md={1} lg={2}>
            {rooms.map((room) => {
                return (
                <Col key={room.room_id} className="mb-5">
                <RoomBookingCard room={room} updateCallback={onUpdateCallback} />
                </Col>
                )
            })}
            </Row>
        </Container>
    );
  }
  
  export default RoomBookingPage;