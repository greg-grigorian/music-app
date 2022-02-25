import React from "react";
import { loginUrl } from "../spotify";

export default function Login() {

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
                        <span className="login_btn">
                            Login
                        </span>
                    </a>
                    <br />
                    <br />
                    <p>OR</p>
                    <a href={loginUrl}>
                        <span className="login_btn">
                            Sign Up
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
}
