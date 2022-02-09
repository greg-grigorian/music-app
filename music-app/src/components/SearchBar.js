
import React, { useState } from 'react'
import * as Io from 'react-icons/io'; //some nice looking icons

const SearchBar = ({ onSearch }) => {
    const [query, displayQuery] = useState(""); //toggling what's actually been searched
    const handleSubmit = (except) => {
        except.preventDefault();
        onSearch(query);
    };
    return (
    <>
        <form className="searchbar" onSubmit={handleSubmit}>
        <input
            type="text"
            id="SearchBar"
            placeholder="Search for whatever you want to!"
            onChange={(change) => displayQuery(change.target.value)}
        />
        <button className="searchbar_button" onClick={handleSubmit}>
            <Io.IoIosSearch/> 
            <span>SEARCH</span>
            
        </button>
        </form>
    </>
    ); // classic searchbar, just with something to (hopefully) catch exceptions
};

const ReturnSearch = ({ search, searches, addsong }) => { //basically returning just the searchbar for now
    return (
        <>
            <div> 
                <SearchBar onSearch={search} />
            </div>
        </>
    )
}


export default ReturnSearch;