import React, { useState,useEffect } from "react";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";
import { useSelector,useDispatch } from "react-redux";

 const Map =()=> {
//events
  const { tripId,tripevents,Tripdestination } = useSelector((state) => ({
    tripId: state.trips.trip.id,
    tripevents: state.trips.trip.tripevents,
    Tripdestination:state.trips.trip.destination,

  }));

  useEffect(()=>{
    document.getElementById("loading").hidden=false
  },[tripId])

//google map
const [loader,setLoader] =useState (null)
useEffect(()=>{
  const func=async()=>{
const {data} = await axios.get("/api/google/map");
setLoader(data);
  }

  func();

},[])

const loaderInstance = loader &&new Loader(loader);
  

loaderInstance &&loaderInstance.load().then(() => {
    const infoWindow = new google.maps.InfoWindow();
    let geocoder = new google.maps.Geocoder();
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
    });
geocoder.geocode({'address': Tripdestination},function(results,status){
  if(status =='OK') {
    map.setCenter(results[0].geometry.location)
  }
  else {
    map.setCenter({ lat: 40.730610, lng: -73.935242 });
  }
})


    

//do_requestion function 

const do_request =(event,geocoder,map,infoWindow)=>{
  geocoder.geocode( { 'address': event.location}, function(results, status) {
  if (status == 'OK') {
    console.log("eventLocation===>",results[0].geometry.location)
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
  console.log('Geocode was not successful for the following reason: ' + status);
}
})


}

//call do_request func

if(tripevents) {
for(let i =0;i<tripevents.length;i++) {
  setTimeout(()=>{
    do_request(tripevents[i],geocoder,map,infoWindow);

  },600*i);
}
setTimeout(()=>{
  document.getElementById("loading").hidden=true
},1000*tripevents.length);
}


  });


  //trip detail
  const {destination} = useSelector((state)=>({destination:state.trips.trip.destination}))
    return <div style={{paddingTop:"80px"}}>
      <h1>Map for all events</h1>
      <h2 id="loading" hidden={false}>Events Loading...</h2>
      <div style={{ height: '100vh', width: '100%' }}>
      <div id="map" style={{height: "100%"}}></div>
      </div>
      </div>
}

export default Map
