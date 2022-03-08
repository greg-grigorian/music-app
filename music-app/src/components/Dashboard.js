import React, { useEffect } from "react";
import useAuth from "../auth";
import SpotifyWebApi from "spotify-web-api-node";
import { useNavigate } from "react-router-dom";

let axios = require("axios");

// Setting the spotifyApi, so that we can use it's functions
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
});

export default function Dashboard({ code }) {
    spotifyApi.resetAccessToken();
    spotifyApi.resetRefreshToken();

    const navigate = useNavigate();

    const tokenData = useAuth(code);

    useEffect(() => {
        if (!tokenData[0]) return;
        spotifyApi.setAccessToken(tokenData[0]);
        spotifyApi.setRefreshToken(tokenData[1]);

        //Get user details with help of getMe() function
        spotifyApi.getMe().then((data) => {
            let id = data.body.id;
            axios
                .post(
                    `http://localhost:${process.env.REACT_APP_SERVER_PORT}/spotifysignup`,
                    { id }
                )
                .then((response) => {
                    // If success then cut the code string from the URL and execute the other thing
                    window.history.pushState({}, null, "/");

                    // Redirect to home page
                    navigate("/home");
                })
                .catch((e) => {
                    console.log(e);
                    window.location = "/";
                });
        });
    }, [tokenData[0]]);

    return <div></div>;
}
