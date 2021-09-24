import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {addTripEvent,removeTripEvent} from "../store/trips"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RatingView } from 'react-simple-star-rating'
import dateFormat from "dateformat";

let categoryList =[
{key:"active",value:"Active Life"},
{key:"arts",value:"Arts & Entertainment"},
{key:"beautysvc",value:"Beauty & Spas"},
{key:"education",value:"Education"},
{key:"eventservices",value:"Event Planning & Services"},
{key:"nightlife",value:"Nightlife"},
{key:"massmedia",value:"Mass Media"},
{key:"religiousorgs",value:"Religious Organizations"},
{key:"shopping",value:"Shopping"},
{key:"localflavor",value:"Local Flavor"}]

const AddActivity= (props)=> {

   const {trip,tripId,tripevents} = useSelector((state)=>({trip:state.trips.trip,tripId:state.trips.trip.id,tripevents:state.trips.trip.tripevents}))
   const [activityList,setActivityList] = useState([]);
   const [searchValue,setSearchValue] = useState("");
   const [category,setCategory] = useState("");
   const [description,setDescription] = useState("");
   const [startDate, setStartDate] = useState(null);
   const [location,setLocation] =useState("");
   const [sortValue,setSortValue] =useState("");



   const dispatch = useDispatch();
   const handleSubmit = async(event)=>{
    event.preventDefault();
    const {data} =  await axios.get("/api/yelp/activity",{params:{term:searchValue,category:category,location}});
    setActivityList(data);
}
useEffect(()=>{
  const func = async()=> {
    const { data } = await axios.get("/api/yelp/activity", {
      params: { term: searchValue, location:trip.destination },
    });
    setActivityList(data);
  }
  func();
},[trip.destination])

    useEffect(() => {
      if(trip.destination) {
         setLocation(trip.destination);}
       }, [trip.destination]);

    useEffect (()=>{ 
        let list;
        if(sortValue==="rating") {
    
          list = activityList.sort(function(a,b) {
           return b.rating-a.rating;
          })
          console.log(list,activityList)
          setActivityList(list);
        }else if(sortValue==="price") {
          list = activityList.sort(function(a,b) {
            return a.price?a.price.length:0-b.price.length;
           })
           setActivityList(list);
        }
    
      },[sortValue])

return (
    <div style={{padding:"20px"}}>
      <div className="d-lg-flex flex-column align-content-center flex-wrap mr-md-6">
        <table className="table table-hover shadow p-3 mb-5 bg-white rounded">
        <thead>
        <tr>
          <th scope="col">Reserved Date Time</th>
          <th scope="col">Activity Place</th> 
          <th scope="col">Activity Website</th> 
          <th scope="col">Activity Address </th>
          <th scope="col">Delete</th>
        </tr>
        </thead>
        <tbody>
{tripevents&&tripevents.map(event=>
event.purpose==="OTHER"?
  <tr key = {event.id}>
    <td scope="row">{dateFormat(event.startDate,"mm/dd/yyyy h:MM:ss TT")}</td>
    <td>{event.placeName}</td> 
    <td><a href={event.url} target="_blank">Website Link</a></td> 
    <td>{event.location}</td> 
    <td><button type="button" className="btn btn-outline-danger" onClick={()=>{
dispatch(removeTripEvent(tripId,event.id))
}}><i class="far fa-trash-alt"></i></button></td>
  </tr>
:null
)}</tbody></table>










        <form className ="flexBox" onSubmit={handleSubmit}>
        <div className="input-group">
        <span className="input-group-text mr-md-3">You can change a destination or search for an activity</span>
        <select className="btn btn-primary input-group-text mr-md-3" aria-label=".form-select-lg example" value ={category} onChange={(e)=>{setCategory(e.target.value)}}>
            <option >{`<---Select a Category--->`}</option>
            {categoryList.map((cate,ind)=><option key ={ind} value={cate.key} >{cate.value}</option>)}
          </select>
        <input value={location} onChange={(e)=>{setLocation(e.target.value)}} aria-label="location" className="form-control" />
        <input autoFocus placeholder="search for activity" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} autoFocus type="text" aria-label="activity" className="form-control" />
          
          <button type="submit" className="btn btn-primary input-group-text">search</button>
          <button type="button" className="btn btn-primary input-group-text" onClick={()=>{setSearchValue("");setCategory("")}}>clear</button>
        
        </div>
        </form>
        <br />
<div>
<Link className="btn btn-primary mr-md-3"to={`/restaurant`}>Go Back to Restaurant Page:</Link>
<Link className="btn btn-primary mr-md-3"to="/calendar">Once Activity is added, click here to go the calendar</Link>
</div>     
       
</div>      
        <div className="flexBox">
        {activityList.map(activity=>
        <ul className="shadow-lg p-3 mb-5 mr-md-3 d-flex flex-column bg-white rounded" key ={activity.id} style={{ padding: "10%", width:"30%",listStyleType: "none" ,textAlign:"center"}}>
        <a href={activity.url} target="_blank"><img className="img-thumbnail"
                style={{ width: "300px", height: "300px" }} src={activity.image_url}></img></a>
        <li >{activity.name}</li>
        <li> <RatingView ratingValue={activity.rating} /></li>
        <li >{activity.categories[0].title}</li>
        <li><input placeholder="Add event description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></input></li>

      <DatePicker
      placeholderText='Reserve DateTime'
      timeInputLabel="Pick a Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        withPortal/>
        <button type="button" className="btn btn-outline-secondary " onClick={()=>{

            if(startDate) {

            dispatch(addTripEvent({
                purpose:"ACTIVITY",
                startDate,
                tripId,
                description,
                placeName:activity.name,
                url:activity.url,
                location:activity.location.display_address.join(", "),
                yelpId:activity.id,
                rating:activity.rating,
                priceLevel:activity.price
            }));
            setStartDate(null);
            setDescription("")
            
        } else 
        
        {
            alert("please select your dateRange")}

        }}>Add to trip</button>
        </ul>)}</div>

        </div>

)


}

export default AddActivity