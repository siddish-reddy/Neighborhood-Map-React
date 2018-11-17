/*global google*/
// https://github.com/tomchentw/react-google-maps/issues/434#issuecomment-309487111

import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'

/*  
    React Google Maps components out of the box by @tomchentw
    documentation: https://tomchentw.github.io/react-google-maps/
    source: https://github.com/tomchentw/react-google-maps
*/
const MapHelper = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
        defaultZoom={13}
        defaultCenter ={{lat: 13.6288, lng: 79.4192}}
    >
        {props.markers && props.markers.filter(marker =>marker.show).map(marker=>
            <Marker key={marker.id} position={{lat:marker.lat, lng:marker.lng}} onClick={()=> props.handleClicker(marker)} defaultAnimation={google.maps.Animation.bounce}>
                {marker.selected && <InfoWindow role="dialog">
                    <React.Fragment >
                        <img src={marker.imgURL} alt='Venue' />
                        <h4>{marker.name}</h4>
                        <p>{marker.rating} </p>
                    </React.Fragment>
                </InfoWindow>}
            </Marker>
        )}
    </GoogleMap>
))

class Map extends React.Component {
    render() {
        console.log(this.props.venueMarkers)
        return (
            <div className='map'>
                <MapHelper 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTTzXP7josYUR3SCtDQQoxnQrrM_djTd0"
                    loadingElement = {<div style = {{height: `100%`}} />}
                    containerElement = {<div style={{height:`100vh`}}/>}
                    mapElement = {<div style = {{height: `100%`}} />}
                    markers = {this.props.venueMarkers}
                    imgURLs = {this.props.imgURLS}
                    handleClicker={this.props.handleClicker}
                />
            </div>
        )
    }
}

export default Map
