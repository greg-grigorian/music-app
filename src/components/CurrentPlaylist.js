import React from 'react';
import Songs from './Songs';


class CurrentPlaylist extends React.Component {  
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }  

    // Allows you to change the name of the playlist
    handleNameChange(newname){
        this.props.onNameChange(newname.target.value);
    }

    render() {
        return(
            <div>
                <div>
                    <input className="current_playlist_title" onChange={this.handleNameChange} value={this.props.playlistName}/>
                    <button className="current_playlist_button" onClick={this.props.onSave}>
                        SAVE
                    </button>
                 </div>
                 <div className="current_playlist">
                    <Songs songs={this.props.playlistContents} onRemove={this.props.onRemove} isRemoval={true}/>
                 </div>
            </div>
            
        )
    }
}

export default CurrentPlaylist;