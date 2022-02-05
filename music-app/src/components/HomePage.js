import React from 'react'
const HomePage = () => {
    const Signup = () => {
        
    }

    const Login = () => {
        
    }
    return (
        <>
            <div className="container">
                <br /><br /><br />
                <h1>PlayList</h1>
                <br /><br />
                <span className="homepage_button" onClick={() => Login()}>Login</span>
                <br /><br />
                <p>OR</p>
                <span className="homepage_button" onClick={() => Signup()}>SignUp</span>
            </div>
        </>
    )
};

export default HomePage;