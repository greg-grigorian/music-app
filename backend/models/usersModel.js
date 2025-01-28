const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
    {
        spotifyID: {
            type: String,
            required: true,
            unique: true,
        },
        playlists: {
            type: [
                {
                    name: String,
                    songs: Array,
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

const User = new mongoose.model("User", userSchema, "spotifyUsers");

module.exports.User = User;
