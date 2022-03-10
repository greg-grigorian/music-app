import React from 'react'
import Sidebar from './Sidebar'
import Songs from "./Songs"
import SearchBar from "./Searchbar"
import { useEffect, useState } from "react";

import Spotify from "../spotify"
class Results extends React.Component {
    render() {
        return(
            <div className="searchresults">
                <Songs songs={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
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
      };
    }

    searchSong(term){
        Spotify.getUser().then(id => {
            axios.get(
                `http://localhost:${process.env.REACT_APP_SERVER_PORT}/getplaylists`,
                { params: { id } }
            )
            .then((response) => {
                //console.log(response.data.playlistData);
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
                    <SearchBar onSearch={this.searchSong} searchResults={this.state.searchResults} />
                </div>
                <div className="recommendations">
                <Results searchResults={this.state.searchResults} />
                </div>
            </div>
        
        </>
    )
}
}

export default Playlist;