import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


export class TripMap extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

      mapCenter: {
          lat: 28.538336,
          lng:  -81.379234
      }
    };
   
  
   
    render() {
      return (
        <Map 
        google={this.props.google}
        initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng

        }}
            >
          <Marker 
                position={{
                    lat: 28.538336,
          lng:  -81.379234
                }} />
        </Map>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: ('AIzaSyAG9cx-Cl81xpcjfNhL6emoDjhNVdF8oFE')
  })(TripMap)