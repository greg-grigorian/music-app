import React from 'react';
import NewPlaylist from './NewPlaylist';
import Playlists from './Playlists';

class PlaylistContainer extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        playlists: [],
        names: [],
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    }
  
    handleNameChange(names) {
      this.setState({
        names,
      });
    }

    handlePlaylistChange(playlists) {
        this.setState({
          playlists,
        });
      }
  
    render() {
      return (
        <div>
          <NewPlaylist updatedPlaylists={this.handlePlaylistChange} updatedNames={this.handleNameChange}/>
          <Playlists names={this.state.names} playlists={this.state.playlists}/>
        </div>
      );
    }
  }