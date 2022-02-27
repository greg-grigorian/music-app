import React from 'react';
import CurrentPlaylist from './CurrentPlaylist';
import Spotify from '../spotify';
import Sidebar from './Sidebar';
import Songs from './Songs';

// Search bar is only used here, so it no longer gets its own file
class SearchBar extends React.Component {
    // initializing functions we need
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleSearch(){
        this.props.onSearch(this.state.term);
    }

    handleTermChange(change){
        this.setState({ 
          term: change.target.value 
        });
    }

    handleKeyDown(down){
        if(down.keyCode === 13){ // the enter key
            this.props.onSearch(this.state.term); // no term provided
            down.preventDefault(); 
        }
    }

    render() {
        return(
        
        <div className="searchbar">
                <input placeholder="Search for a song, artist, or album" onChange={this.handleTermChange} onKeyDown={this.handleKeyDown}/>
                <button className="searchbar_button" onClick={this.handleSearch}>
                <span>SEARCH</span>
                </button>
        </div>
        
            
        );
    }
}

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
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistName: 'My Playlist', // filler text for the playlist name
      searchResults: [],
      playlistContents: []
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

  addSong(song){
    let songs = this.state.playlistContents;
    if(songs.find(savedTrack => savedTrack.id === song.id)){
        return;
    } 
    else {
      songs.push(song);
      this.setState({ playlistContents: songs });
    }
  }

  deleteSong(song){
    let songs = this.state.playlistContents;
    songs = songs.filter(currentTrack => currentTrack.id !== song.id);

    this.setState({ playlistContents: songs });
  }


  
  syncSpotify(){
    const trackURIs = this.state.playlistContents.map(track => track.uri);

    if(!trackURIs.length){
      return;
    }

    Spotify.syncSpotify(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'My Playlist', //reset playlist name and tracks after playlist is saved to user's account
        playlistContents: []
      });
    });
  }

  searchSpotify(term){
    Spotify.searchSong(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  changeName(name){
    this.setState({ playlistName: name });
  }

  render(){
    return (
      <div>
          <Sidebar />
        <div className="homepage_container">
          <div className="left_homepage">
              
            <SearchBar onSearch={this.searchSpotify} searchResults={this.state.searchResults} 
              onAdd={this.addSong} />
            <br></br>
            <Results searchResults={this.state.searchResults} 
              onAdd={this.addSong} />
            <div className="right_homepage">
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

export default HomePage;