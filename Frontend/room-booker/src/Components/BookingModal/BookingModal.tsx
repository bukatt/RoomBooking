import { useSelector } from "react-redux";
import { AppState } from "../../Models/State/AppState";
import { Button, Modal } from "react-bootstrap";
import { BookingSlot } from "../../Models/BookingSlot";
import axios from "axios";
import Endpoints from "../../Endpoints/Endpoints";

function BookingModal(props: { show: boolean, roomSlot: BookingSlot | null, roomName: string, closeCallback: () => void, updateCallback: () => void }) {
  const { user } = useSelector((state: AppState) => state.auth);

  const updateBooking = () => {
    return axios.patch(Endpoints.bookings + "/" + props.roomSlot?.room_booking_id, { user_id: user.user_id });
  }

  const bookClicked = () => {
    updateBooking().then(response => {
      console.log(response);
      props.closeCallback();
      if (props.roomSlot?.room_booking_id) {
        props.updateCallback();
      }
    },
    err => {
      props.closeCallback();
    })
  }

  return (
    <Modal show={props.show} onHide={props.closeCallback}>
      <Modal.Body>
        <p>{`Book ${props.roomName} at ${props.roomSlot?.start_time}?`}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.closeCallback} variant="secondary">No</Button>
        <Button onClick={bookClicked} variant="primary">Yes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingModal;