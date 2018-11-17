import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import {parseMarkers, getPhotoUrl} from './FourSquare'
import SearchPanel from './SearchPanel'
import escapeRegExp from 'escape-string-regexp'
class App extends Component {

  state ={
    venues:[],
    query:'',
    matchingVenues:[]
  }

  async componentDidMount(){
    parseMarkers().then(venues => {
        const venuesPhotoUrlPromises = venues.map(async venue=> 
          await getPhotoUrl(venue.id)
        )
        Promise.all(venuesPhotoUrlPromises)
        .then(venuesPhotoUrl=>{
          for(let i=0;i<10;i++){
            venues[i].imgURL=venuesPhotoUrl[i];
          }
          this.setState({venues, matchingVenues:venues})
        })
        .catch(reason=>console.log(reason))
        
    }).catch(reason=>console.log(reason))
    console.log('App component mounted');
  }

  handleSearchInput = (query)=>{
    this.setState({query: query.trim()})
    const match = new RegExp(escapeRegExp(query), 'i')
    let matchingVenues = this.state.venues.filter((venue) => match.test(venue.name))
    this.setState({matchingVenues})
  }

  handleClicker= (marker)=> {
    const clickedVenueidx = this.state.venues.findIndex(venue=>venue.id===marker.id)
    let venues = this.state.venues.map(venue =>{ venue.selected=false; return venue;})
    venues[clickedVenueidx].selected = true
    this.setState({matchingVenues:venues})
    // hack to change particular property of particular object from: https://stackoverflow.com/a/46761122
  }
  handleSideBarClose = () =>{
    this.handleSearchInput('')
  }
  render() {
    return (
      <div role='main' className="App" id="app">
        <SearchPanel pageWrapId={ "page-wrap" } outerContainerId={ "app" }
          handleSearchInput={this.handleSearchInput}
          venues={this.state.matchingVenues}
          query={this.state.query}
          handleClicker = {this.handleClicker}
          showAllMarkers = {this.handleSideBarClose}
        />
        <Map id="page-wrap"
          handleClicker = {this.handleClicker}
          venueMarkers={this.state.venues}
        />
      </div>
    );
  }
}

export default App;