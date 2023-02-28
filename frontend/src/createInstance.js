import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
    try {
        const res = await axios.post("/auth/refresh", {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};


export const createAxios = (user, dispatch, loginSuccess) => {
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decoedToken = jwt_decode(user?.accessToken);
            if (decoedToken.exp * 1000 < date.getTime()) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                }
                dispatch(loginSuccess(refreshUser));
                config.headers["Authorization"] = "Bearer" + data.accessToken;
            }
            return config
        },
        (err) => {
            return Promise.reject(err);
        }
    )
    return newInstance;
}