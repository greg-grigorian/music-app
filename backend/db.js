const mongoose = require("mongoose");
const userModel = require("./models/usersModel").User;

//Connecting MongoDb to the React App
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

//Creating spotify user with either existing User or a new one and adding to collection
module.exports.createUser = (spotifyID, tracks) => {
    const db = mongoose.connection;
    let collection = db.collection("spotifyUsers");
    collection.findOne({ spotifyID: spotifyID }, (err, user) => {
        if (user) {
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

// Add potential playlists/tracks to user data when updated
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
            collection.updateOne(
                { spotifyID: spotifyID },
                { $set: { playlists: newPlaylists } }
            );
        } else {
            this.createUser(spotifyID, tracks);
        }
    });
}; 

// Retrieve user playlists from backend server
module.exports.getUserPlaylists = async (spotifyID) => {
    const db = mongoose.connection;
    let collection = db.collection("spotifyUsers");
    let playlists;
    await collection.findOne({ spotifyID: spotifyID }).then(user => {
        if (user) {
            playlists = user.playlists;
        }
    })
    return playlists;
}; 
