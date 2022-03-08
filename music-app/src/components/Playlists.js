import React from 'react'
import Sidebar from './Sidebar'
import Songs from "./Songs"
import SearchBar from "./Searchbar"
import PlaylistContainer from './PlaylistContainer'

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

class Playlist extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        searchResults: [],
      };
    }
    searchSong(term){
      console.log(this.props.playlists)
        Spotify.searchSong(term).then(searchResults => {
          this.setState({ 
            searchResults: searchResults 
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