import React from 'react';

class PlaylistSearchBar extends React.Component {
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

    // Handle search term
    handleSearch(){
        this.props.onSearch(this.state.term);
    }

    // Handles user request
    handleTermChange(change){
        this.setState({ 
          term: change.target.value 
        });
    }

    // Prevents no input
    handleKeyDown(down){
        if(down.keyCode === 13){ // the enter key
            this.props.onSearch(this.state.term); // no term provided
            down.preventDefault(); 
        }
    }

    render() {
        return(
        <div className="playlist_searchbar">
                <input placeholder="Search for something!" onChange={this.handleTermChange} onKeyDown={this.handleKeyDown}/>
                <button className="playlist_searchbar_button" onClick={this.handleSearch}>
                <span>SEARCH</span>
                </button>
        </div>
        
            
        );
    }
}

export default PlaylistSearchBar;