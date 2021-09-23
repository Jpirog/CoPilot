import React from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GoogleMap =({events})=> {
//google map
const loader = new Loader({
    apiKey: "AIzaSyAStFOdHfunpjDJckRnvA8zZNCLnOmuTLU",
    version: "weekly",
    libraries: ["places"],
  });
  
  loader.load().then(() => {
    const infoWindow = new google.maps.InfoWindow();
    let geocoder = new google.maps.Geocoder();
    let map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.730610, lng: -73.935242 },
      zoom: 12,
    });
 

    codeAddress(events,geocoder,map,infoWindow)
  });


  function codeAddress(events,geocoder,map,infoWindow) {

    events&&events.map(event=>{
        
    geocoder.geocode( { 'address': event.location}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title:event.placeName,
            
        });
 
        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
          });


      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })

    

}
);
  }





    return <div style={{ height: '100vh', width: '100%' }}><div id="map" style={{height: "100%"}}>this is map</div></div>
}

export default GoogleMap