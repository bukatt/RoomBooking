import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import MyBookingsPage from './Pages/MyBookingsPage/MyBookingsPage';

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
          <Routes>
            <Route exact path="/" element={<SignUpPage />}/>
            <Route exact path="/sign-up" element={<SignUpPage />}/>
            <Route exact path="/login" element={<LoginPage />}/>
            <Route exact path="/my-bookings" element={<MyBookingsPage />}/>
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
