import React from 'react'
import Sidebar from './Sidebar'

// class Results extends React.Component {
//     render() {
//         return(
//             <div className="searchresults">
//                 <Songs songs={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
//             </div>
//         )
//     }
//   }



export default function Playlists() {
    return (
        <>
        <Sidebar/>
            <div className="playlists_container">
                <div className="playlists_title">
                    <h2>Playlists</h2>
                </div>

                
            </div>
        
        </>
    )
}