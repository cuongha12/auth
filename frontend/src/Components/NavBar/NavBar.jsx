
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { logOut } from "../../redux/apiRequest";
import { logOutSuccess } from "../../redux/authSlice";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const handleLogout = () => {
    logOut(dispatch, navigate, accessToken, axiosJWT);
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user === undefined || user === null ? (
        <>
          <Link to="/login" className="navbar-login"> Login </Link>
          <Link to="/register" className="navbar-register"> Register</Link>
        </>
      ) : (
        <>
          <p className="navbar-user">{user.data.name}<span></span> </p>
          <button className="navbar-logout" onClick={handleLogout}> Log out</button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
