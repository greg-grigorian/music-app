import Sidebar from './Sidebar';
import Recommendations from './Recommendations';

export default function HomePage() {
    
    //Display sidebar and welcome page with recommended playlists
    return (
        <>
        <Sidebar/> 
        <div className="recommendations_container"> 
            <div className="recommendations_title">
                <h1>
                    Welcome!
                </h1>
                <h3>
                    How are you feeling?
                </h3>
            </div> 

            <Recommendations />
        </div>
       

        </>
                
    );
}

