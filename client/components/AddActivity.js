import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {addTripEvent,removeTripEvent} from "../store/trips"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";
import StarRatings from "react-star-ratings"
import AutoComInput from "./GoogleAutoComplete"

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
   const [activityEvents,setActivityEvents] = useState([]);
   const [searchValue,setSearchValue] = useState("");
   const [category,setCategory] = useState("");
   const [description,setDescription] = useState("");
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [location,setLocation] =useState("");
   const [sortValue,setSortValue] =useState("");
   const [changeId,setChangeId] =useState("")



   const dispatch = useDispatch();
   const handleSubmit = async(event)=>{
    event.preventDefault();
    const {data} =  await axios.get("/api/yelp/activity",{params:{term:searchValue,category:category,location}});
    setActivityList(data);
}

  function availableDates() {
    let activeDays = [];
    let amountActDays =
      new Date(trip.endDate).getDate() - new Date(trip.startDate).getDate();
    for (let i = 0; i <= amountActDays; i++) {
      activeDays.push(
        new Date(
          new Date(trip.startDate).setDate(
            new Date(trip.startDate).getDate() + i
          )
        )
      );
    }
    return activeDays;
  }

useEffect(()=>{

  if(startDate && description==="MORNINGACTIVITY"){

    setStartDate(new Date(new Date(startDate).setHours(9,0,0)));
    setEndDate(new Date(new Date(startDate).setHours(11,0,0)))
  
  } else if (startDate && description==="AFTERNOONACTIVITY") {
   
    setStartDate(new Date(new Date(startDate).setHours(13,0,0)));
    setEndDate(new Date(new Date(startDate).setHours(16,0,0)))
  


  } else if(startDate &&description==="NIGHTACTIVITY"){

    setStartDate(new Date(new Date(startDate).setHours(19,0,0)));
    setEndDate(new Date(new Date(startDate).setHours(21,0,0)))
   }
},[description])

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
        if(sortValue==="Rating") {
    
          list = activityList.sort(function(a,b) {
           return b.rating-a.rating;
          })
          setActivityList([...list]);
        }else if(sortValue==="PriceLowToHigh") {
          list = activityList.filter((obj) => obj.price).sort(function (a, b) {
            return a.price.length - b.price.length;
        });
        setActivityList(
          list.concat(activityList.filter((obj) => !obj.price))
        );
        } else if (sortValue === "PriceHighToLow") {
          list = activityList.filter((obj) => obj.price).sort(function (a, b) {
              return b.price.length - a.price.length;
          });
          setActivityList(
            list.concat(activityList.filter((obj) => !obj.price))
          )
        }
    
      },[sortValue])

      useEffect(() => {
        let list =
          tripevents && tripevents.filter((event) => event.purpose === "MORNINGACTIVITY"||"AFTERNOONACTIVITY"||"NIGHTACTIVITY");
          setActivityEvents(list);
      }, [tripevents]);

return (
    <div style={{padding:"100px"}}>
      <div className="d-lg-flex flex-column align-content-center flex-wrap mr-md-6">
        <table className="table table-hover shadow p-3 mb-5 bg-white rounded">
        <thead>
        <tr>
          <th scope="col">Reserved Date Time</th>
          <th scope="col">End Date Time</th>
          <th scope="col">Activity Place</th> 
          <th scope="col">Activity Website</th> 
          <th scope="col">Activity Address </th>
          <th scope="col">Delete</th>
        </tr>
        </thead>
        <tbody>
{activityEvents&&activityEvents.map(event=>
  <tr key = {event.id}>
    <td scope="row">{dateFormat(event.startDate,"mm/dd/yyyy h:MM TT")}</td>
    <td scope="row">{dateFormat(event.endDate,"mm/dd/yyyy h:MM TT")}</td>
    <td>{event.placeName}</td> 
    {/*rel="noreferrer" added for security reason to prevent referrer info leaks */}
    <td><a href={event.url} target="_blank" rel="noreferrer">Website Link</a></td> 
    <td>{event.location}</td> 
    <td><button type="button" className="btn btn-outline-danger" onClick={()=>{
dispatch(removeTripEvent(tripId,event.id))
}}><i className="far fa-trash-alt"></i></button></td>
  </tr>
)}</tbody></table>

        <form className ="flexBox" onSubmit={handleSubmit}>
        <div className="input-group">
        <span className="input-group-text mr-md-3">You can change a destination or search for an activity</span>
        <select className="btn btn-outline-primary input-group-text mr-md-3" aria-label=".form-select-lg example" value ={category} onChange={(e)=>{setCategory(e.target.value)}}>
            <option >{`<---Select a Category--->`}</option>
            {categoryList.map((cate,ind)=><option key ={ind} value={cate.key} >{cate.value}</option>)}
          </select>
        <AutoComInput value={location} onChange={(e)=>{setLocation(e.target.value)}} aria-label="location" className="form-control" />
        <input autoFocus placeholder="search for activity" value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} type="text" aria-label="activity" className="form-control" />
          
          <button type="submit" className="btn btn-outline-primary mr-md-3">search</button>
          <button type="button" className="btn btn-outline-primary mr-md-3" onClick={()=>{setSearchValue("");setCategory("")}}>clear</button>
        
          <select
            className="btn btn-outline-primary mr-md-3"
            aria-label=".form-select-lg example"
            value={sortValue}
            onChange={(e) => {
              setSortValue(e.target.value);
            }}
          >
            <option>Sort by</option>
            <option value={"Rating"}>Rating: High to low</option>
            <option value={"PriceLowToHigh"}>Price: Low to High</option>
            <option value={"PriceHighToLow"}>Price: High to Low</option>
          </select>

        </div>
        </form>
        <br />
<div>
<Link className="btn btn-outline-primary mr-md-3"to="/calendar">Once Activity is added, click here to go the calendar</Link>
</div>     
       
</div>  

<br />
        <div className="flexBox">
        {activityList.map(activity=>
        <ul className="shadow-lg mx-auto p-3 d-flex flex-column align-content-center flex-wrap bg-white rounded" key ={activity.id} style={{ padding: "10%", width:"30%",listStyleType: "none" ,textAlign:"center"}}>
        <a href={activity.url} target="_blank" rel="noreferrer"><img className="img-thumbnail"
                style={{ width: "300px", height: "300px" }} src={activity.image_url}></img></a>
        <li >{activity.name}</li>
        <li> 
          <StarRatings
          rating={activity.rating}
          starRatedColor = 'gold'
          starDimension = '20px'
          starSpacing = '3px'
          />
        </li>
        <li>{activity.price?activity.price:`No Price Info`}</li>
        <li >{activity.categories[0].title}</li>
 <li style={{marginBottom:"3.5px"}}>
          <select  id= {activity.id} style ={{width:"200px",height:"28px"}} placeholder="Add event description" value={changeId===activity.id?description:""} onChange={(e)=>{

            setChangeId(event.target.id)
            setDescription(e.target.value)
            }}>
            <option value="DEFAULT">Pick an time range</option>
            <option value="MORNINGACTIVITY">Morning - 2 hrs</option>
            <option value="AFTERNOONACTIVITY">Afternoon - 3 hrs</option>
            <option value="NIGHTACTIVITY">Night - 3 hrs</option>
          </select>  
      
</li>
<li style={{marginBottom:"3.5px"}}>
      <DatePicker
        placeholderText='Select a date'
        timeInputLabel="Pick a time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        includeDates={availableDates()}
        selected={changeId===activity.id?startDate:null}
        // showTimeInput
        onChange={(date) => {
         
          if(description==="MORNINGACTIVITY"){

            setStartDate(new Date(new Date(date).setHours(9,0,0)));
            setEndDate(new Date(new Date(date).setHours(11,0,0)))
          
          } else if (description==="AFTERNOONACTIVITY") {
           
            setStartDate(new Date(new Date(date).setHours(13,0,0)));
            setEndDate(new Date(new Date(date).setHours(16,0,0)))
          


          } else if(description==="NIGHTACTIVITY"){

            setStartDate(new Date(new Date(date).setHours(19,0,0)));
            setEndDate(new Date(new Date(date).setHours(21,0,0)))
           }
        }}
        withPortal
      />
      </li>
        <button type="button" className="btn btn-outline-secondary " onClick={()=>{
            if (description === '') {
              alert("Please pick a time range")
            } else if(startDate) {

            dispatch(addTripEvent({
                purpose:description,
                startDate,
                endDate,
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