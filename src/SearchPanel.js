import React from 'react'
import {scaleDown  as SideBar} from 'react-burger-menu'

//TODO: Need to handle keyboard events to allow the user to interact with the element without using the mouse.
class SearchPanel extends React.Component{
    state={
        isOpen:true
    }
    handleVenueClick = ()=>{
        this.setState({isOpen:false})
        this.props.showAllMarkers()
    }
    handleStateChange (state) {
        this.setState({isOpen: state.isOpen})  
    }

    render(){
        return (
            <SideBar isOpen={this.state.isOpen} noOverlay
             onStateChange={(state) => this.handleStateChange(state)}>
                <header> <h2 tabIndex={0}>Watchout Tirupati</h2></header>
                    <input 
                        type='text' 
                        placeholder='Search Places'
                        id = 'search-bar'
                        value={this.props.query}
                        onChange={(event) => this.props.handleSearchInput(event.target.value)}
                        tabIndex={0} aria-label="Find your next favorite place"
                    />
                <ol >
                    {this.props.venues && this.props.venues.filter(venue =>venue.show).map(venue=>
                    <li key={venue.id} 
                        onClick={()=> {this.handleVenueClick(); this.props.handleClicker(venue)}}
                        tabIndex={0} role="button" aria-label={`Select Venue ${venue.name}`}
                    >
                            {venue.name}
                    </li>
                    )}
                </ol>
            </SideBar>
        );
    }
}

export default SearchPanel