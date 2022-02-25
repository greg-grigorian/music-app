const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = `http://localhost:3000/`;
const clientId = "716871d72e2d4591aa397b56fc6c2210";

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}`;
