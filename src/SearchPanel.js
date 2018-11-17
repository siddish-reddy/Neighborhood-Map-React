import React from 'react'
import {scaleDown  as SideBar} from 'react-burger-menu'


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
            <SideBar isOpen={this.state.isOpen}
             onStateChange={(state) => this.handleStateChange(state)}>
                <header> <h2>Watchout Tirupati</h2></header>
                <label style={{cursor:'default'}}> Find your next favorite restaurant
                    <input 
                        type='text' 
                        placeholder='Search Places'
                        id = 'search-bar'
                        value={this.props.query}
                        onChange={(event) => this.props.handleSearchInput(event.target.value)}
                    />
                </label>
                <ol>
                    {this.props.venues && this.props.venues.filter(venue =>venue.show).map(venue=>
                    <li key={venue.id} onClick={()=> {this.handleVenueClick();  this.props.handleClicker(venue)}}>{venue.name}</li>
                    )}
                </ol>
            </SideBar>
        );
    }
}

export default SearchPanel