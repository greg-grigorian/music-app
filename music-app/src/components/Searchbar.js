import React from 'react';

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

    // Handles search term
    handleSearch(){
        this.props.onSearch(this.state.term);
    }

    // Handles user requests
    handleTermChange(change){
        this.setState({ 
          term: change.target.value 
        });
    }

    //Prevents no search term
    handleKeyDown(down){
        if(down.keyCode === 13){ // the enter key
            this.props.onSearch(this.state.term); // no term provided
            down.preventDefault(); 
        }
    }

    render() {
        return(
        <div className="searchbar">
                <input placeholder="Search for something!" onChange={this.handleTermChange} onKeyDown={this.handleKeyDown}/>
                <button className="searchbar_button" onClick={this.handleSearch}>
                <span>SEARCH</span>
                </button>
        </div>
        
            
        );
    }
}

export default SearchBar;