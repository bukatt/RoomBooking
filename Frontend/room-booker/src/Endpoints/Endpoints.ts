const Endpoints = {
    user: process.env.REACT_APP_BASEURL + "/user",
    login: process.env.REACT_APP_BASEURL + "/token",
    rooms: process.env.REACT_APP_BASEURL + "/rooms",
    bookings: process.env.REACT_APP_BASEURL + "/room-booking",
    roomsWS: process.env.REACT_APP_WSURL + "/ws/room-booking"
}

export default Endpoints