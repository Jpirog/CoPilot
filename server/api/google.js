require('dotenv').config();
const router = require('express').Router()

const apiKey =process.env.GOOGLE_API_KEY;

module.exports = router
router.get("/map",(req,res,next)=>{
    try{
        console.log("googlekey",apiKey)
    const paramsList = {
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places"],
      };
    res.send(paramsList)

    }catch(er) {
        next(er)
    }


})

// const loader = new Loader({
//     apiKey: apiKey,
//     version: "weekly",
//     libraries: ["places"],
//   });
  
//   loader.load().then(() => {
//     const infoWindow = new google.maps.InfoWindow();
//     let geocoder = new google.maps.Geocoder();
//     let map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 40.730610, lng: -73.935242 },
//       zoom: 12,
//     });
 

//     codeAddress(events,geocoder,map,infoWindow)
//   });