import { useEffect } from "react";
import "./home.css";
import { getAllUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const userList = useSelector((state) => state.user.users?.allUsers?.data?.rows)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (user?.accessToken) {
      getAllUser(user?.accessToken, dispatch, axiosJWT)
    }
  }, [dispatch, navigate, user])

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container" key={user.id}>
              <div className="home-user">{user.name}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
