import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddHotel= (props)=> {
  const tripId = props.match.params.tripId;
  const {trip,tripevents} = useSelector((state)=>({trip:state.trips.trip,tripevents:state.trips.trip.tripevents}))

   
  const [hotelList,setHotelList] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const [date, setDate] = useState(null);
  const dispatch = useDispatch();


  const handleSubmit = async(event)=>{
    event.preventDefault();
    const {data} =  await axios.get("/api/yelp/hotel",{params:{term:searchValue}});
    setHotelList(data);
  }

  useEffect(()=> {
    dispatch(getTripDetails(tripId))
  },[]) 

  useEffect( ()=>{
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

{

tripevents&&tripevents.map(event=>
event.purpose==="SLEEP"?
<table border="2px">
  <tr>
    <th>Start Date</th>
    <th>Description</th> 
    <th>delete</th>
    
  </tr>
  <tr>
    <td>{event.startDate}</td>
    <td>{event.description}</td> 
    <td><button type="button" onClick={()=>{
dispatch(removeTripEvent(tripId,event.id))
}}>Delete </button></td>
  </tr>

</table>:null




//         <ul key ={event.id} style={{flex:1,flexDirection:"row",padding:"20px"}}>
// <li>{event.description}</li>
// <li>{event.startDate}</li>
// <button type="button" onClick={()=>{
//     dispatch(removeTripEvent(tripId,event.id))
// }}>Delete </button>
//         </ul>:null)
)}



        <form onSubmit={handleSubmit}>
        <input placeholder="search for your hotel" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
        <button type="submit">search</button>
        <button type="button" onClick={()=>{setSearchValue("")}}>clear search</button>
        </form>

        <Link to="/activity">Go to Next:</Link>
        

        {hotelList.map(hotel=>
        <ul key ={hotel.id} style={{flex:1,flexDirection:"row",padding:"20px"}}>
        <a href={hotel.url}><img style={{width:"20%",height:"20%"}} src={hotel.image_url}></img></a>
        <li >{hotel.name}</li>
        <li >{hotel.rating}</li>
        <li >{hotel.price}</li>

       { trip.id&&<DatePicker 
       selected={date} 
       selectsStart
       onChange={(date) => setDate(date)} 
       placeholderText='select a day'
       openToDate={new Date(trip.startDate)}
       dayClassName={(date) =>{
       return (date>=new Date(trip.startDate) && date <=new Date(trip.endDate))?"highlighted" : undefined
       
        }
    }/>}     
        <button onClick={()=>{
            dispatch(addTripEvent({purpose:"SLEEP",startDate:date,endDate:date,tripId,description:`hotel: ${hotel.name}, website:${hotel.url}`}))
        }}>Add to trip</button>
        </ul>)}

        </div>

)


}

export default AddHotel