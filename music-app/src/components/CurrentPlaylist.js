import React from 'react';
import Songs from './Songs';


class CurrentPlaylist extends React.Component {  
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }  

    handleNameChange(newname){
        this.props.onNameChange(newname.target.value);
    }

    render() {
        return(
            <div>
                <div classname="Playlist">
                    <input className="playlist_title" onChange={this.handleNameChange} value={this.props.playlistName}/>
                    <button className="playlist_button" onClick={this.props.onSave}>
                        SAVE
                    </button>
                 </div>
                 <div className="playlist_homepage">
                    <Songs songs={this.props.playlistContents} onRemove={this.props.onRemove} isRemoval={true}/>
                 </div>
            </div>
            
        )
    }
}

export default CurrentPlaylist;