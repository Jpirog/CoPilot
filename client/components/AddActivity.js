import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {addTripEvent,removeTripEvent,updateTripEvent} from "../store/trips"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let categoryList =["active","beautysvc","arts","bicycles","education","eventservices","nightlife","massmedia","religiousorgs","shopping","localflavor"]



const AddActivity= (props)=> {

   const {trip,tripId,tripevents} = useSelector((state)=>({trip:state.trips.trip,tripId:state.trips.trip.id,tripevents:state.trips.trip.tripevents}))
   const [activityList,setActivityList] = useState([]);
   const [searchValue,setSearchValue] = useState("");
   const [category,setCategory] = useState("");
   const [description,setDescription] = useState("");
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [location,setLocation] =useState("")

   const dispatch = useDispatch();
   const handleSubmit = async(event)=>{
    event.preventDefault();
    const {data} =  await axios.get("/api/yelp/activity",{params:{term:searchValue,category:category,location}});
    setActivityList(data);
}

    useEffect(
        ()=>{
          const func = async()=>{
          const {data} =  await axios.get("/api/yelp/activity",{params:{location}});
          setActivityList(data);
            };
            func()
    },[location])

    useEffect(()=>{
      setLocation(trip.destination)
    },[trip])

return (
    <div style={{padding:"20px"}}>

<table border="2px">
<tbody>
  <tr>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Activity Place</th> 
    <th>Activity Website</th> 
    <th>Activity Address </th>
    <th>Delete</th>

  </tr>
{tripevents&&tripevents.map(event=>
event.purpose==="OTHER"?
  <tr key = {event.id}>
    <td>{(event.startDate)}</td>
    <td>{event.endDate}</td>
    <td>{event.placeName}</td> 
    <td><a href={event.url}>Link of Website</a></td> 
    <td>{event.location}</td> 
    <td><button type="button" onClick={()=>{
dispatch(removeTripEvent(tripId,event.id))
}}>Delete</button></td>
  </tr>
:null
)}</tbody></table>

<br />
<Link to="/home"><button>Go to Next?:</button></Link>
<Link to={`/hotel`}><button>Go Back to Hotel:</button></Link>
<br />
<label>Change location</label>
<input value={location} onChange={(e)=>{setLocation(e.target.value)}}></input>


        <form className ="flexBox" onSubmit={handleSubmit}>
          <select value ={category} onChange={(e)=>{setCategory(e.target.value)}}>
            <option >{`<---Select a Category--->`}</option>
            {categoryList.map((cate,ind)=><option key ={ind} value={cate} >{cate}</option>)}
          </select>
     
          <input placeholder="type in key word" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
          <button type="submit">search</button>
          <button type="button" onClick={()=>{setSearchValue("");setCategory("")}}>clear</button>
        </form>
       

        
        <div className="flexBox">
        {activityList.map(activity=>
        <ul className ="item" key ={activity.id} style={{padding:"2%",width:"33%",listStyleType:"none"}}>
        <a href={activity.url}><img style={{width:"60%",height:"60%"}} src={activity.image_url}></img></a>
        <li >{activity.name}</li>
        <li >{activity.rating}</li>
        <li >{activity.categories[0].title}</li>
        <li><input placeholder="add event description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></input></li>
<>
      <DatePicker
      placeholderText='select a start DateTime'
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
           placeholderText='select an End DateTime'
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
console.log(activity.location.display_address.join(""))

            if(startDate&&endDate) {

            dispatch(addTripEvent({
                purpose:"OTHER",
                startDate,
                endDate,
                tripId,
                description,
                placeName:activity.name,
                url:activity.url,
                location:activity.location.display_address.join(""),
                yelpId:activity.id,
                rating:activity.rating,
                priceLevel:activity.price
            }));
            
        } else 
        
        {
            alert("please select your dateRange")}

        }}>Add to trip</button>
        </ul>)}</div>

        </div>

)


}

export default AddActivity