import React, { useEffect } from "react";
import useAuth from "../auth";
import SpotifyWebApi from "spotify-web-api-node";
import { useNavigate } from "react-router-dom";

let axios = require("axios");

// Setting the spotifyApi, so that we can use it's functions
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
});

export default function Dashboard({ code }) {
    const navigate = useNavigate();

    const accessToken = useAuth(code);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

        // Get user details with help of getMe() function
        spotifyApi.getMe().then((data) => {
            let id = data.body.id;
            axios
                .post("http://localhost:8000/spotifysignup", { id })
                .then((response) => {
                    // If success then cut the code string from the URL and execute the other thing
                    window.history.pushState({}, null, "/");

                    // Redirect to home page
                    navigate("/home");
                })
                .catch(() => {
                    window.location = "/";
                });
        });
    }, [accessToken]);

    return <div>{code}</div>;
}
