import { logOutFailed, logOutStart, logOutSuccess, loginFailed, loginStart, loginSuccess } from "./authSlice"
import axios from "axios"
import { getUserStart, getUserSuccess, getUsersFailed } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/login", user)
        if (res.data.err <= 0) {
            return dispatch(loginFailed(res.data))
        }
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart())
    try {
        const res = await axiosJWT.get("/auth/", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailed())
    }
}

export const logOut = async (dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post("/auth/logout", {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(logOutFailed());
    }
};