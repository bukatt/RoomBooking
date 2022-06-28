import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RoomBookingPage from './Pages/RoomBookingPage/RoomBookingPage';
import LogoutPage from './Pages/LogoutPage/LogoutPage';
import NavBar from './Components/NavBar/NavBar';


function App() {

  return (
      <div className="App">
      <header className="App-header">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <div className="page-container">
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/sign-up" element={<SignUpPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/room-bookings" element={<RoomBookingPage />}/>
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
          </div>
      </header>
    </div>
  );
}

export default App;
