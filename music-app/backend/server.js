require("dotenv").config();

const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");
const db = require("./db.js");

const app = express();
const port = process.env.REACT_APP_SERVER_PORT;

// DB
db.connectDB();

// API
app.use(cors());
app.use(express.json());

const credentials = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: `http://localhost:${process.env.REACT_APP_CLIENT_PORT}/`,
};

app.post("/spotifylogin", (req, res) => {
    let spotifyApi = new spotifyWebApi(credentials);
    const code = req.body.code;

    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
            // Returning the User's AccessToken in the json format
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

app.post("/spotifysignup", (req, res) => {
    const spotifyID = req.body.id;
    db.createUser(spotifyID, []);
    res.sendStatus(200);
});

app.post("/addPlaylist", (req, res) => {
    const spotifyID = req.body.currentUser;
    const tracks = req.body.songs;
    const playlistName = req.body.playlistName;

    db.updateUser(spotifyID, playlistName, tracks);
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/getplaylists", (req, res) => {
    const spotifyID = req.body.id;
    let data
    data = db.getUserPlaylists(spotifyID);
    res.json({
        playlistData: data
    });
    res.sendStatus(200);
});
