import React from 'react'
import Sidebar from './Sidebar'
import Songs from "./Songs"
import PlaylistSearchBar from "./PlaylistSearchbar"
import SearchBar from './Searchbar';

import Spotify from "../spotify"
class Results extends React.Component {
    render() {
        return(
            <div className="searchresults">
                <Songs songs={this.props.searchResults}  isRemoval={false}/>
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
      };
      this.searchSong = this.searchSong.bind(this);
    }


    searchSong(term){
      Spotify.searchSong(term).then(searchResults => {
        this.setState({ 
          searchResults: searchResults, 
          targetPlaylist: ""
        });
      });
      let target = this.state.searchResults[0].uri
      console.log(this.state.searchResults[0].name)
        Spotify.getUser().then(id => {
            axios.get(
                `http://localhost:${process.env.REACT_APP_SERVER_PORT}/getplaylists`,
                { params: { id } }
            )
            .then((response) => {
              let library = response.data.playlistData
              for (var i = 0; i < library.length; i++){
                //console.log(library[i])
                  for (var j = 0; j < library[i].songs.length; j++){
                    //console.log(library[i].songs[j])
                      if (target === library[i].songs[j]){
                        let name = library[i].name
                        this.setState({ 
                          targetPlaylist : name 
                        });
                      }
                  }
              }
                console.log(this.state.targetPlaylist);
                console.log(this.state.searchResults)
            })
            .catch((e) => {
                console.log(e);
                window.location = "/";
            });
        })
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
                 <Results searchResults={this.state.searchResults} />         
                </div>
            </div>
        
        </>
    )
}
}

export default Playlist;