const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = `http://localhost:${process.env.REACT_APP_CLIENT_PORT}/`;
const clientId = process.env.REACT_APP_CLIENT_ID;

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}`;

let accessToken;

const Spotify = {
    /* This is only here because I couldn't figure out how to get the useAuth working. Will probably disappear later*/
    // Also this doesn't let you know when the access token expires...
    authorizeSpotify() {
        // If the access token already exists, return it
        if (accessToken) {
            return accessToken;
        }
        // Else, if the token shows up in the window location, return it
        const accessTokenMatch =
            window.location.href.match(/access_token=([^&]*)/);
        if (accessTokenMatch) {
            accessToken = accessTokenMatch[1];
            return accessToken;
        } else {
            // Direct user to the login page of spotify.
            // KNOWN BUG: Redirects to new every time. Would be nice if it put users back where they were.
            // Will be fixed, if, say, the access token was taken once at login and never again. (aka useAuth works here)
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:${process.env.REACT_APP_CLIENT_PORT}/new/`; //redirects user to access url
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:${process.env.REACT_APP_CLIENT_PORT}/home/`; //redirects user to access url
        }
    },

    // for reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/search
    // As of now, this triggers a code get upon first use. This is because of the repetitive authorization.
    // Also, the accesstoken appears in the URL - remove that later
    searchSong(query) {
        const accessToken = Spotify.authorizeSpotify();
        // api call using the access token
        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${query}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
            .then((response) => {
                // Response comes back in a json
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return []; // no songs, return empty list
                }
                // else, get the info we need. URI is for saving the playlist to Spotify.
                return jsonResponse.tracks.items.map((track) => {
                    return {
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        id: track.id,
                        uri: track.uri,
                    };
                });
            });
    },

    // these are searches for playlists based on a topic
    getRecommendations() {
        const accessToken = Spotify.authorizeSpotify();
        // API call, using the term set by whatever button the user clicked.
        const { term } = this.state;
        return fetch(
            `https://api.spotify.com/v1/search?q=${term}&type=playlist&limit=20`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((recommendations) => {
                this.setState({
                    // Could map it.
                    recs: recommendations.playlists.items, // need quite a bit of information about the playlists
                });
            });
    },

    // reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist
    syncSpotify(playlistName, songs) {
        //saves the playlist to the user's Spotify account
        if (!playlistName || !songs.length) {
            // User didn't add songs or a name
            return;
        }
        // authorization
        const accessToken = Spotify.authorizeSpotify();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        // getting user info
        let currentUser;

        return fetch(
            `https://api.spotify.com/v1/me`, //gets user info from Spotify
            { headers: headers }
        )
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                currentUser = jsonResponse.id; // got user!
                // using userID to create a new playlist
                return fetch(
                    `https://api.spotify.com/v1/users/${currentUser}/playlists`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": `application/json`,
                        },
                        method: "POST",
                        // playlist is created here
                        body: JSON.stringify({
                            name: playlistName, // using the name in the field of the new playlist page
                        }),
                    }
                )
                    .then((response) => {
                        return response.json();
                        // after the playlist was created, we can fill it with the songs
                    })
                    .then((jsonResponse) => {
                        const playlistID = jsonResponse.id;
                        return fetch(
                            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                            {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                    "Content-Type": `application/json`,
                                },
                                method: "POST",
                                body: JSON.stringify({
                                    uris: songs, // putting in the songs
                                }),
                            }
                        );
                    });
            });
    },
};

export default Spotify;
