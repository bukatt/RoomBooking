import { Button, Modal } from "react-bootstrap";
import { BookingSlot } from "../../Models/BookingSlot";
import axios from "axios";
import Endpoints from "../../Endpoints/Endpoints";


function CancelBookingModal(props: {show: boolean, roomSlot: BookingSlot | null, roomName: string, closeCallback: () => void, updateCallback: () => void}) {
    const updateBooking = () => {
      return axios.patch(Endpoints.bookings + "/" + props.roomSlot?.room_booking_id, {user_id: null})
    }

    const bookClicked = () => {
      updateBooking().then(response => {
        console.log(response);
        props.closeCallback();
        if(props.roomSlot?.room_booking_id){
            props.updateCallback();
          }
      })
    }

    return (
        <Modal show={props.show} onHide={props.closeCallback}>
        <Modal.Body>
          <p>{`Cancel booking for ${props.roomName} at ${props.roomSlot?.start_time}?`}</p>
        </Modal.Body>
      
        <Modal.Footer>
          <Button onClick={props.closeCallback} variant="secondary">No</Button>
          <Button onClick={bookClicked} variant="primary">Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default CancelBookingModal;