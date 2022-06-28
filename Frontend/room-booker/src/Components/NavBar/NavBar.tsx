import { useSelector } from "react-redux";
import { AppState } from "../../Models/State/AppState";
import { Container, Navbar } from "react-bootstrap";
import { LoginState } from "../../Enums/LoginState";


function NavBar() {
    const { user, loginState } = useSelector((state: AppState) => state.auth)

    const getTitle = () => {
        if(loginState === LoginState.LoggedIn){
            return user.company_id === 1 ? "Coca-Cola" : 'Pepsi';
        } else {
            return "Room Booking";
        }
    }

    const getLoginText = () => {
        if (loginState === LoginState.LoggedIn){
            return "Log out";
        } else if(loginState === LoginState.LoggedOut) {
            return "Login";
        } else if (loginState === LoginState.LoggingIn) {
            return "Logging In...";
        } else {
            return "Login";
        }
    }

    const loginRoute = () => {
        if (loginState === LoginState.LoggedIn){
            return "/logout";
        } else if(loginState === LoginState.LoggedOut) {
            return "/login";
        } else {
            return "";
        }
    }

    return (
        <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="">{getTitle()}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Text>
                <a href={loginRoute()}>{getLoginText()}</a>
            </Navbar.Text>
        </Container>
        </Navbar>
    );
  }
  
  export default NavBar;