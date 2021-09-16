import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {addTripEvent,removeTripEvent} from "../store/trips"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoogleMap from "./googleMap";







const AddHotel= (props)=> {
   const {tripId,tripevents} = useSelector((state)=>({tripId:state.trips.trip.id,tripevents:state.trips.trip.tripevents}))
   const [hotelList,setHotelList] = useState([]);
   const [searchValue,setSearchValue] = useState("");
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [addressList,setAddressList] =useState([]);

//dispatch thunk
   const dispatch = useDispatch();


   const handleSubmit = async(event)=>{
    event.preventDefault();
    const {data} =  await axios.get("/api/yelp/hotel",{params:{term:searchValue}});
    setHotelList(data);
}

    useEffect(
        ()=>{
          const func = async()=>{
          const {data} =  await axios.get("/api/yelp/hotel");
          setHotelList(data);
            };
            func()
    },[])

    useEffect(()=>{

      let list = tripevents&&tripevents.filter(event=>event.purpose==="SLEEP").map(event=>JSON.parse(event.description))
   setAddressList(list)
  
  },[tripevents])

    

return (
    <div style={{padding:"20px"}}>


     

<table border="2px">
<tbody>
  <tr>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Hotel Name</th> 
    <th>Hotel Website</th> 
    <th>Hotel Location </th>
    <th>delete</th>
  </tr>
{tripevents&&tripevents.map(event=>
event.purpose==="SLEEP"?
  <tr key = {event.id}>
    <td>{(event.startDate)}</td>
    <td>{event.endDate}</td>
    <td>{JSON.parse(event.description).name}</td> 
    <td><a href={JSON.parse(event.description).website}>Link of Website</a></td> 
    <td>{JSON.parse(event.description).location}</td> 
    <td><button type="button" onClick={()=>{
dispatch(removeTripEvent(tripId,event.id))
}}>Delete</button></td></tr>
:null


)}</tbody></table>

<br />

<Link to={`/activity`}><button>Go to Activity:</button></Link>
        <form onSubmit={handleSubmit}>
        <input placeholder="search for your hotel" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
        <button type="submit">search</button>
        <button type="button" onClick={()=>{setSearchValue("")}}>clear search</button>
        </form>
        
<div className="flexBox">
        {hotelList.map(hotel=>
        <ul className ="item" key ={hotel.id} style={{padding:"2%",width:"33%",listStyleType:"none"}}>
        <a href={hotel.url}><img style={{width:"60%",height:"60%"}} src={hotel.image_url}></img></a>
        <li >{hotel.name}</li>
        <li >{hotel.rating}</li>
        <li >{hotel.price}</li>
 
      

       <>
      <DatePicker
      placeholderText='select a CheckIn DateTime'
      timeInputLabel="Pick a Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        withPortal/>
      <DatePicker
           placeholderText='select a CheckOut DateTime'
      timeInputLabel="Pick a Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        withPortal
      />
    </>   
        <button onClick={()=>{

            if(startDate&&endDate) {

            dispatch(addTripEvent({
                purpose:"SLEEP",
                startDate,
                endDate,
                tripId,
                description:
                JSON.stringify({name: hotel.name, website:hotel.url,location:JSON.stringify(hotel.location.display_address)}),
                
            }));
            
        } else 
        
        {
            alert("please select your dateRange")}

        }}>Add to trip</button>
        </ul>)}  </div>
<br />  
<GoogleMap addressList={addressList}/>
        </div>

)


}

export default AddHotel