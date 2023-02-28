import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Save = (e) => {
        e.preventDefault()
        const newUser = {
            email: email,
            password: password,
        }
        loginUser(newUser, dispatch, navigate)
        setEmail("")
        setPassword("")
    }
    return (
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form onSubmit={(e) => Save(e)}>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit"> Continue </button>
            </form>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
    );
}

export default Login;