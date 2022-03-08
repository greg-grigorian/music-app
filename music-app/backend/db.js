const mongoose = require("mongoose");
const userModel = require("./models/usersModel").User;

module.exports.connectDB = async () => {
    try {
        const databaseName = "spotifydb";
        const con = await mongoose.connect(
            `mongodb://127.0.0.1:27017/${databaseName}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log(`Database connected : ${con.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports.createUser = (spotifyID, tracks) => {
    const db = mongoose.connection;
    let collection = db.collection("spotifyUsers");
    collection.findOne({ spotifyID: spotifyID }, (err, user) => {
        if (user) {
            console.log("User alr exists");
            return;
        } else {
            let user = new userModel({
                spotifyID: spotifyID,
                playlists: tracks,
            });

            collection.insertOne(user);
        }
    });
};

module.exports.updateUser = (spotifyID, playlistName, tracks) => {
    const db = mongoose.connection;
    let collection = db.collection("spotifyUsers");
    collection.findOne({ spotifyID: spotifyID }, (err, user) => {
        if (user) {
            let newPlaylists = user.playlists;
            let toAdd = {
                name: playlistName,
                songs: tracks,
            };

            newPlaylists.push(toAdd);
            console.log(newPlaylists);
            collection.updateOne(
                { spotifyID: spotifyID },
                { $set: { playlists: newPlaylists } }
            );
        } else {
            this.createUser(spotifyID, tracks);
        }
    });
};
