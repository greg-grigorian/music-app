const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        spotifyID: {
            type: String,
            required: true,
            unique: true,
        },
        playlists: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

const User = new mongoose.model("User", userSchema, "spotifyUsers");

module.exports.User = User;
