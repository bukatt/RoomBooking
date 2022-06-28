import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Room } from "../../Models/Room";
import { useSelector } from "react-redux";
import { AppState } from "../../Models/State/AppState";
import './RoomBookingCard.css'
import * as joda from '@js-joda/core';
import * as Locale from '@js-joda/locale_en-us'
import { BookingSlot } from "../../Models/BookingSlot";
import { BookingSlotStatus } from "../../Enums/BookingSlotStatus";
import BookingModal from "../BookingModal/BookingModal";
import CancelBookingModal from "../CancelBookingModal/CancelBookingModal";
import { Col, Row } from "react-bootstrap";

function RoomBookingCard(props: {room: Room, updateCallback: () => void}) {
    const { user, loginState } = useSelector((state: AppState) => state.auth)
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [clickedBooking, setClickedBooking] = useState<BookingSlot | null>(null);

    const getButtonVariant = (slotUser: number | null) : string => {
      if(!slotUser){
        return 'outline-primary'
      } else if (slotUser === user.user_id) {
        return 'outline-success'
      } else {
        return 'outline-danger'
      }
    }

    const formatDate = (localTime: joda.LocalTime) => {
      const formatter: joda.DateTimeFormatter = new joda.DateTimeFormatterBuilder().appendPattern("h:mm a").toFormatter().withLocale(Locale.Locale.US)
      return localTime.format(formatter)
    }

    const onSlotClicked = (booking: BookingSlot) => {
      setClickedBooking(booking)
      switch(booking.status){
        case BookingSlotStatus.Available:
          setShowBookingModal(true)
          break;
        case BookingSlotStatus.MyBooking:
          setShowCancelModal(true);
          break;
        default:
          break
      }
    }

    const onBookingModalClosed = () => {
      setShowBookingModal(false)
    }

    const onCancelModalClosed = () => {
      setShowCancelModal(false)
    }

    const bookingButtonDisabled = (booking: BookingSlot) => {
      return booking.status === BookingSlotStatus.Unavailable ? true : false
    }

    return (
      <>
      <Card style={{backgroundColor: '#F5F5F5'}} className="card">
        <Card.Body>
            <Card.Title>
            {`Room: ${props.room.name}`}
            </Card.Title>
            <Row xs={3} md={4} lg={4} xl={4}>
            {props.room.room_bookings.map((slot, i) => {
              return (
                <Col key={i} className="mb-3">
                <Button title="Button" disabled={bookingButtonDisabled(slot)} onClick={() => onSlotClicked(slot)} variant={getButtonVariant(slot.user)}>
                  {formatDate(slot.start_time)}
                </Button>
                </Col>
              )})}
              </Row>
        </Card.Body>
      </Card>
      <BookingModal updateCallback={props.updateCallback} closeCallback={onBookingModalClosed} show={showBookingModal} roomName={props.room.name} roomSlot={clickedBooking}></BookingModal>
      <CancelBookingModal updateCallback={props.updateCallback} closeCallback={onCancelModalClosed} show={showCancelModal} roomName={props.room.name} roomSlot={clickedBooking}></CancelBookingModal>
      </>
    );
  }
  
  export default RoomBookingCard;