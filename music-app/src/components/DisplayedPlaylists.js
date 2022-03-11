import React from 'react';
import * as Io from 'react-icons/io'; //some nice looking icons


/* Reusable component to list out songs */
// each individual song has the song title, ability to add/remove, and artist - album
class DisplayedPlaylist extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="song">
                <div className="about_song">
                    <h2> {this.props.playlist.name} </h2>
                </div>
            </div>
        )
    }
}

// group the songs in a map
class DisplayedPlaylists extends React.Component {
    render() {
        return(
            <div>
                {
                this.props.playlists.map(playlist => {
                    return <DisplayedPlaylist playlist={playlist}   />;
                })
                }
            </div>
        );
    }
}

export default DisplayedPlaylists;