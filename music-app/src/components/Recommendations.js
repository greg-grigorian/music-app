import React, { Component } from 'react';
import Spotify from '../spotify';

class Recommendations extends Component {
    constructor(props) {
    super(props);

    this.state = {
        term: '',
        recs: []
    };
    
    //Initialize recommendations instances from Spotify
    this.happy = this.happy.bind(this);
    this.depressed = this.depressed.bind(this);
    this.chill = this.chill.bind(this);
    this.stressed = this.stressed.bind(this);
    this.hype = this.hype.bind(this);
    this.top = this.top.bind(this);
}


  // Linking each button to a Spotify search

  happy(){
    this.setState({
      term: "happy"
    }, Spotify.getRecommendations);
  }

  depressed (){
    this.setState({
      term: "depressed"
    }, Spotify.getRecommendations);
  }

  chill(){
    this.setState({
      term: "chill"
    }, Spotify.getRecommendations);
  }

  stressed (){
    this.setState({
      term: "stressed"
    }, Spotify.getRecommendations);
  }


  hype(){
    this.setState({
      term: "hype"
    }, Spotify.getRecommendations);
  }

  top (){
    this.setState({
      term: "top"
    }, Spotify.getRecommendations);
  }
  
  render() {
    // map of recommendations
    const recommendation = this.state.recs.map(recommendation => {
        return (
          <div className="recommendation_playlist" key={recommendation.id}>
            <a href={recommendation.external_urls.spotify} target="_blank" rel="noreferrer">      
                <p className="recommendation_name">{recommendation.name}</p>
                <p className="recommendation_user">{recommendation.owner.display_name}</p>     
        
            </a>            
          </div>
        )
    })
    // don't want buttons to scroll, separate devision
    return (
      <div>
        <div className="recommendation_mood"> 
          <button onClick={this.hype}>Hype</button>
          <button onClick={this.happy}>Happy</button> 
          <button onClick={this.chill}>Chill</button>
          <button onClick={this.stressed}>Stressed</button>
          <button onClick={this.depressed}>CS 35L Project Due</button>
          <button onClick={this.top}>Just want the popular stuff</button>

        </div>
        <div className="recommendations">
            {recommendation}
        </div>
      </div>
      )
    }
  }

export default Recommendations;