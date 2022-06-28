import { logout } from "../../Store/auth/authSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function LogoutPage(props: any) {
    const dispatch = useDispatch()
    dispatch(logout());

    return (
        <Navigate to='/login' />
    );
  }
  
  export default LogoutPage;