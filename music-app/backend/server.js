require("dotenv").config();

const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");
const db = require("./db.js");
const mongoose = require("mongoose");

const app = express();
const port = process.env.SERVER_PORT;
const User = require("./models/usersModel").User;
// DB
db.connectDB();

// API
app.use(cors());
app.use(express.json());

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: `http://localhost:${process.env.CLIENT_PORT}/`,
};

app.post("/spotifylogin", (req, res) => {
    let spotifyApi = new spotifyWebApi(credentials);
    const code = req.body.code;
    console.log(code);
    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
            // Returning the User's AccessToken in the json format
            res.json({
                accessToken: data.body.access_token,
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

app.post("/spotifysignup", (req, res) => {
    const spotifyID = req.body.id;
    User.findOne({ spotifyID: spotifyID }, (err, user) => {
        if (user) {
            console.log("User alr exists");
        } else {
            db.createUser(spotifyID);
        }
    });
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
