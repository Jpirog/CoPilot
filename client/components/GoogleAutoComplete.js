import React, { useState,useEffect } from "react";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";

const AutoComInput = ({value,onChange})=> {
  const [loader,setLoader] =useState (null)
useEffect(()=>{
  const func=async()=>{
const {data} = await axios.get("/api/google/map");
setLoader(data);
  }
  func();
},[])

const loaderInstance = loader &&new Loader(loader);
  
const input = document.getElementById("in");
value && (input.value =value);
const options = {
  fields: ["formatted_address", "geometry", "name"],
  strictBounds: false,
  // types: ["(cities)"],
};

loaderInstance &&loaderInstance.load().then(() => {
const autocomplete = new google.maps.places.Autocomplete(input, options);
const place = autocomplete.getPlace();
})

return <input id="in" className="form-control" />
     

}

export default AutoComInput;
