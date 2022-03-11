require("dotenv").config();

const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");
const db = require("./db.js");
const axios = require("axios");
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
let spotifyApi = new spotifyWebApi(credentials);

app.post("/spotifylogin", (req, res) => {
    const code = req.body.code;

    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
            // Returning the User's AccessToken in the json format
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
            });
            spotifyApi.setAccessToken(data.body.access_token);
            spotifyApi.setRefreshToken(data.body.refresh_token);
            
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

// Syncs User's playlist from Spotify and creates a new entry in the database for User
app.post("/spotifysignup", (req, res) => {
    const spotifyID = req.body.id;
    let syncPlaylists = [];

    spotifyApi.getUserPlaylists(spotifyApi).then(async (data) => {
        let playlists = data.body.items
        for(const playlist of playlists) {
            let pName = playlist.name
            let trackLink = playlist.tracks.href
       
            await axios
                .get(`${trackLink}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    },
                })
                .then(async (res) => {
                    let songs = [];
                    for (const song of res.data.items) {
                        if (song.track){
                            await songs.push(song.track.uri);
                        }                     
                    }
                    await syncPlaylists.push({ name: pName, songs: songs });
                });
        }       
        if(syncPlaylists != []) {
            await db.createUser(spotifyID, syncPlaylists);
        }
        res.sendStatus(200);
    });
}); 

// Add playlist to database
app.post("/addPlaylist", (req, res) => {
    const spotifyID = req.body.currentUser;
    const tracks = req.body.songs;
    const playlistName = req.body.playlistName;

    db.updateUser(spotifyID, playlistName, tracks);
    res.sendStatus(200);
});

// Get playlist from database
app.get("/getplaylists", async (req, res) => {
    const spotifyID = req.query.id;
    let data = await db.getUserPlaylists(spotifyID)
    await res.json({
        playlistData: data,
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));