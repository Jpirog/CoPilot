import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent,updateTripEvent} from "../store/trips"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let categoryList =["active","beautysvc","arts","bicycles","education","eventservices","nightlife","massmedia","religiousorgs","shopping","localflavor"]



const AddActivity= (props)=> {
    const tripId = props.match.params.tripId;

   const {trip,tripevents} = useSelector((state)=>({trip:state.trips.trip,tripevents:state.trips.trip.tripevents}))
   const [activityList,setActivityList] = useState([]);
   const [searchValue,setSearchValue] = useState("");
   const [category,setCategory] = useState("");

   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);

   const dispatch = useDispatch();

   const handleSubmit = async(event)=>{
    event.preventDefault();
    const {data} =  await axios.get("/api/yelp/activity",{params:{term:searchValue,category:category}});
    setActivityList(data);
}
    useEffect(()=> {
       dispatch(getTripDetails(tripId))
   },[]) 

    useEffect(
        ()=>{
          const func = async()=>{
          const {data} =  await axios.get("/api/yelp/activity");
          setActivityList(data);
            };
            func()
    },[])

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
    <th>Edit</th>
  </tr>
{tripevents&&tripevents.map(event=>
event.purpose==="OTHER"?
  <tr key = {event.id}>
    <td>{(event.startDate)}</td>
    <td>{event.endDate}</td>
    <td>{JSON.parse(event.description).place}</td> 
    <td><a href={JSON.parse(event.description).website}>Link of Website</a></td> 
    <td>{JSON.parse(event.description).address}</td> 
    <td><button type="button" onClick={()=>{
dispatch(removeTripEvent(tripId,event.id))
}}>Delete</button></td>
<td><button type="button" onClick={()=>{
console.log("update the time")
}}>Edit</button></td>
  </tr>
:null
)}</tbody></table>

<br />
<Link to="/home"><button>Go to Next?:</button></Link>
<Link to={`/${tripId}/hotel`}><button>Go Back to Hotel:</button></Link>

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

            if(startDate&&endDate) {

            dispatch(addTripEvent({
                purpose:"OTHER",
                startDate,
                endDate,
                tripId,
                description:
                JSON.stringify({place: activity.name, website:activity.url,address:JSON.stringify(activity.location.display_address)}),
                
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