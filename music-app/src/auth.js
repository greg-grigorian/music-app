import { useEffect, useState } from "react";

let axios = require("axios");

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        axios
            .post("http://localhost:5000/spotifylogin", { code })
            .then((response) => {
                // If success then cut the code string from the URL and execute the other thing
                window.history.pushState({}, null, "/");

                console.log(response.data);
                setAccessToken(response.data.accessToken);
            })
            .catch(() => {
                window.location = "/";
            });
    }, [code]);

    return accessToken;
}
