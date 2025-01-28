import React from 'react';
import * as Io from 'react-icons/io'; //some nice looking icons


/* Reusable component to list out songs */
// each individual song has the song title, ability to add/remove, and artist - album
class Song extends React.Component {
    constructor(props){
        super(props);
        // Initializing the add and remove functions
        this.addSong = this.addSong.bind(this);
        this.removeSong = this.removeSong.bind(this);
    }

    // Removing and adding songs
    addSong(){
        this.props.onAdd(this.props.song);
    }

    removeSong(){
        this.props.onRemove(this.props.song);
    }

    renderAction() {
        if(this.props.isRemoval){
            return <button className="song_button" onClick={this.removeSong}>
                <Io.IoMdCloseCircleOutline/>    
            </button>
        } else {
            return <button className="song_button" onClick={this.addSong}>
                <Io.IoIosAddCircleOutline/>    
            </button>
        }
    }


    render() {
        return(
            <div className="song">
                <div className="about_song">
                    <h2> {this.props.song.name} </h2>
                    <p> {this.props.song.artist} - {this.props.song.album} </p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

// group the songs in a map
class Songs extends React.Component {
    render() {
        return(
            <div>
                {
                this.props.songs.map(song => {
                    return <Song key={song.id} song={song} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>;
                })
                }
            </div>
        );
    }
}

export default Songs;