import React, {useState} from 'react'
import Sidebar from './Sidebar';
import ReturnSearch from './SearchBar';

export default function HomePage() {
    const [searches, displaySearches] = useState([])
    const [playlistnames, displayPlaylistNames] = useState("")
    const [playlistsongs, displayPlaylistSongs] = useState([])
    const search = (term) => {
    }

    const doThese = (track) => {

    }
    return (
        <>
            <Sidebar />
            <div className="homepage_container">
                <div className='left_homepage'>
                <br></br>
                <ReturnSearch search={search} searches={searches} addsong={doThese} />
                </div>
                <div className="right_homepage">

                    <h2>Playlists</h2>
                    
                </div>
                
            </div>

        </>
    )
}