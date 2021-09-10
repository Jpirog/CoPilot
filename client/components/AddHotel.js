import axios from "axios";
import React,{useEffect,useDispach,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent} from "../store/trips"

const AddHotel= (props)=> {
   const {trip,tripEvents} = useSelector((state)=>({trip:state.trips.trip,tripEvents:state.trips.trip.tripevents}))

    const [hotelList,setHotelList] = useState([]);
   const dispatch = useDispatch();
   useEffect(()=> {
       const tripId = props.match.params.tripId;

       dispatch(getTripDetails(tripId))
   },[]) 

    useEffect(
        ()=>{
          const func = async()=>{
          const {data} =  await axios.get("/api/yelp/hotel");
          setHotelList(data);
            };
            // func()
    },[])
    const handleSubmit = (event)=> {
        event.preventDefault();
        


    }

return (
    <div style={{padding:"20px"}}>
        
<button type="button" onClick={()=>{

}}>Add A Hotel</button>
        <form>
   
        <input placeholder="search for your hotel"></input>
        </form>
        <Link to="/activity">Go to Next:</Link>

        {hotelList.map(hotel=>
        <ul key ={hotel.id} style={{flex:1,flexDirection:"row",padding:"20px"}}>
        <img style={{width:"20%",height:"20%"}} src={hotel.image_url}></img>
        <li >{hotel.name}</li>
        <li >{hotel.rating}</li>
        <li >{hotel.price}</li>
        </ul>)}


      {console.log(trip)};
      {console.log(tripEvents)};

        </div>
)


}

export default AddHotel