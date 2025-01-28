import { useEffect, useState } from "react";

let axios = require("axios");

// Stores access and refresh tokens
var at = "";
var rt = "";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        axios
            .post(
                `http://localhost:${process.env.REACT_APP_SERVER_PORT}/spotifylogin`,
                { code }
            )
            .then((response) => {
                // If success then cut the code string from the URL and execute the other thing
                window.history.pushState({}, null, "/");

                setAccessToken(response.data.accessToken);
                setRefreshToken(response.data.refreshToken);
            })
            .catch(() => {
                window.location = "/";
            });
    }, [code]);
    at = accessToken;
    rt = refreshToken;
    return [accessToken, refreshToken];
}

export function getTokens() {
    return [at, rt];
}
