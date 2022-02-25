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

module.exports.createUser = async (spotifyID) => {
    const db = mongoose.connection;
    let collection = db.collection("spotifyUsers");
    let user = new userModel({ spotifyID: spotifyID, playlists: [] });
    collection.insertOne(user);
};