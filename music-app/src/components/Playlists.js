import React from 'react'
import Sidebar from './Sidebar'
import Songs from "./Songs"
import PlaylistSearchBar from "./PlaylistSearchbar"
import DisplayedPlaylists from './DisplayedPlaylists'

import Spotify from "../spotify"
class Results extends React.Component {
    render() {
        return(
            <div className="searchresults">
                <DisplayedPlaylists playlists={this.props.displayedPlaylist}  isRemoval={false}/>
            </div>
        )
    }
  }

let axios = require("axios");

class Playlist extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        searchResults: [],
        targetPlaylist: "",
        displayedPlaylist: []
      };
      this.searchSong = this.searchSong.bind(this);
    }

    // Uses search bar to find specific song within User's playlists
    searchSong(term){
      Spotify.searchSong(term).then(searchResults => {
        this.setState({ 
          searchResults: searchResults, 
          targetPlaylist: ""
        });
        
        let target = this.state.searchResults[0].uri;
        Spotify.getUser().then((id) => {
            axios
                .get(
                    `http://localhost:${process.env.REACT_APP_SERVER_PORT}/getplaylists`,
                    { params: { id } }
                )
                .then((response) => {
                    let library = response.data.playlistData;
                    for (var i = 0; i < library.length; i++) {
                        for (
                            var j = 0;
                            j < library[i].songs.length;
                            j++
                        ) {
                            if (target === library[i].songs[j]) {
                                let name = library[i].name;
                                let temp = [];
                                temp.push(library[i]);
                                this.setState({
                                    targetPlaylist: name,
                                    displayedPlaylist: temp,
                                });
                            }
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                    window.location = "/";
                });
        });
      });

    }

render() {
    return (
        <>
        <Sidebar/>
        <h2> Search for a song in your playlists: </h2>
            <div className="playlists_container">
                <div className="playlists_search">
                    <PlaylistSearchBar onSearch={this.searchSong} searchResults={this.state.searchResults} />
                    <br></br>
                 <Results displayedPlaylist={this.state.displayedPlaylist} />         
                </div>
            </div>
        
        </>
    )
}
}

export default Playlist;