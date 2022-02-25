import React, {useState} from 'react'
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

export default function HomePage() {
    const search = (term) => {
    }

    return (
        <>
            <Sidebar />
            <div className="homepage_container">
                <div className='left_homepage'>
                <br></br>
                <div> 
                <SearchBar onSearch={search} />
                </div>
                </div>
                <div className="right_homepage">

                    <h2>Playlists</h2>
                    
                </div>
                
            </div>

        </>
    )
}