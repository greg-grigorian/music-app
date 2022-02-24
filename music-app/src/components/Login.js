import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../spotify";

export default function Login() {
    const navigate = useNavigate();

    const Signup = () => {};

    const Login = () => {};
    return (
        <>
            <div className="login_container">
                <div className="left_login">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br />
                    <br />
                    <br />
                    <h1>PlayList</h1>
                    <br />
                    <br />
                </div>
                <div className="right_login">
                    <br></br>
                    <br></br>
                    <h2>Welcome!</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <a href={loginUrl}>
                        <span className="login_btn" onClick={() => Login()}>
                            Login
                        </span>
                    </a>
                    <br />
                    <br />
                    <p>OR</p>
                    <a href={loginUrl}>
                        <span className="login_btn" onClick={() => Signup()}>
                            Sign Up
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
}
