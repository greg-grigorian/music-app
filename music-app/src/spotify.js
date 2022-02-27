
const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = `http://localhost:3000/`;
const clientId = "adc2c3b25571470cbc6d6838d792a83c";

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
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        if (accessTokenMatch) {
            accessToken = accessTokenMatch[1];
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/home/`;
            window.location = accessURL; //redirects user to access url
        }
    },

    // for reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/search
    // As of now, this triggers a code get upon first use. This is because of the repetitive authorization.
    // Also, the accesstoken appears in the URL - remove that later
    searchSong(query) {
        const accessToken = Spotify.authorizeSpotify();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return []; // no songs
            }
            return jsonResponse.tracks.items.map(track => { 
                return {
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    id: track.id,
                    uri: track.uri
                }
            });
        });
    },

    // reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist
    syncSpotify(playlistName, songs) { //saves the playlist to the user's Spotify account
        if (!playlistName || !songs.length) { // User didn't add songs or a name
            return;
        }
        // authorization
        const accessToken = Spotify.authorizeSpotify();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }

        // getting user info
        let currentUser;

        return fetch(`https://api.spotify.com/v1/me`, //gets user info from Spotify
            {headers: headers}
            ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            currentUser = jsonResponse.id; // got user!
            return fetch(`https://api.spotify.com/v1/users/${currentUser}/playlists`, { 
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': `application/json`
                },
                method: 'POST',
                // playlist is created here
                body: JSON.stringify({
                    name: playlistName
                }) 
                
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                const playlistID = jsonResponse.id; 
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, { 
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': `application/json`
                    },
                    method: 'POST', body: JSON.stringify({
                        uris: songs
                    }) 
                });
            });
        });
    }
};

export default Spotify;