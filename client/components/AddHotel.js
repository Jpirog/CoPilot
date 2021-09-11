import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent} from "../store/trips"



const AddHotel= (props)=> {
   const {trip,tripEvents} = useSelector((state)=>({trip:state.trips.trip,tripEvents:state.trips.trip.tripevents}))

   
   const [hotelList,setHotelList] = useState([]);
   const [searchValue,setSearchValue] = useState("");
   const [dateList,setDateList] = useState([]);
   const dispatch = useDispatch();


   const handleSubmit = async(event)=>{
    event.preventDefault();
    const {data} =  await axios.get("/api/yelp/hotel",{params:{term:searchValue}});
    setHotelList(data);
}

 const calculateNoOfNights = (start,end)=> {

    const date1 = new Date(start);
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;

    const nextDay = new Date(date1.getTime() + oneDay*2);
    // const diffInTime = date2.getTime() - date1.getTime();
    // const diffInDays = Math.round(diffInTime / oneDay);

    return String(nextDay);

 }

 useEffect(()=>{

    calculateNoOfNights(trip.startDate,trip.endDate)

 },[])


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
            func()
    },[])

return (
    <div style={{padding:"20px"}}>
        
{/* <button type="button" onClick={()=>{

}}>Add A Hotel</button> */}

        <form onSubmit={handleSubmit}>
        <input placeholder="search for your hotel" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
        <button type="submit">search</button>
        <button type="button" onClick={()=>{setSearchValue("")}}>clear search</button>
        </form>

        <Link to="/activity">Go to Next:</Link>
        <select>
            {dateList.map(date=><option>{date}</option>)}
        </select>

        {hotelList.map(hotel=>
        <ul key ={hotel.id} style={{flex:1,flexDirection:"row",padding:"20px"}}>
        <a href={hotel.url}><img style={{width:"20%",height:"20%"}} src={hotel.image_url}></img></a>
        <li >{hotel.name}</li>
        <li >{hotel.rating}</li>
        <li >{hotel.price}</li>
        {/* <select>
            <option>{trip.startDate}</option>
        </select> */}
        <button onClick={()=>{
            dispatch(addTripEvent({purpos:"sleep",}))
        }}>Add to trip</button>
        </ul>)}
{console.log(trip)}
        </div>

)


}

export default AddHotel