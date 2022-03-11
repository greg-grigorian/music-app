import React from 'react';
import CurrentPlaylist from './CurrentPlaylist';
import Spotify from '../spotify';
import Sidebar from './Sidebar';
import Songs from './Songs';
import SearchBar from './Searchbar';


// Displays search results. Only used in here, not a reusable component, so it doesn't get its own file.
class Results extends React.Component {
  render() {
      return(
          <div className="searchresults">
              <Songs songs={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
          </div>
      )
  }
}
class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistName: 'My Playlist', // filler text for the playlist name
      searchResults: [],
      playlistContents: [],
    };

    // add delete
    this.addSong = this.addSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);

    // spotify api calls
    this.syncSpotify = this.syncSpotify.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);

    // changing the name
    this.changeName = this.changeName.bind(this);

  }
  // adding song to playlist
  addSong(song){
    let songs = this.state.playlistContents;
    // already in playlist
    if(songs.find(savedTrack => savedTrack.id === song.id)){
        return;
    } 
    // adding new song
    else { 
      songs.push(song);
      this.setState({ 
        playlistContents: songs 
      });
    }
  }
  // deleting a song from playlist
  deleteSong(song){
    let songs = this.state.playlistContents;
    // songs now everything but the song you want to remove
    songs = songs.filter(currentTrack => currentTrack.id !== song.id);

    this.setState({ 
      playlistContents: songs 
    });
  }

  // upload current playlist to spotify
  syncSpotify(){ // to match up with the one in spotify.js
    const songInfo = this.state.playlistContents.map(song => song.uri);
    if(!songInfo.length){
      return;
    }

    Spotify.syncSpotify(this.state.playlistName, songInfo)
    this.setState({ 
      playlistName: 'My Playlist', //reset playlist name and tracks after playlist is saved to user's account
      playlistContents: [],
    });
  }
  
  // using the api call in spotify.js
  searchSpotify(term){
    Spotify.searchSong(term).then(searchResults => {
      this.setState({ 
        searchResults: searchResults 
      });
    });
  }

  // function to change the name of the playlist
  changeName(name){
    this.setState({ 
      playlistName: name 
    });
  }

  render(){
    return (          
      <div>
          <Sidebar />
        <div className="new_container">
          <div className="left_new">
              
            <SearchBar onSearch={this.searchSpotify} searchResults={this.state.searchResults} 
              onAdd={this.addSong} />
            <br></br>
            <Results searchResults={this.state.searchResults} 
              onAdd={this.addSong} />
            <div className="right_new">
                <br></br>
                <CurrentPlaylist playlistName={this.state.playlistName} playlistContents={this.state.playlistContents} onRemove={this.deleteSong} 
              onNameChange={this.changeName} onSave={this.syncSpotify} />             
            </div>            
          </div>
        </div>
      </div>          
    );
  }
}


export default NewPlaylist;