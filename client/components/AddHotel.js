import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTripEvent, removeTripEvent } from "../store/trips";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";
import moment from "moment";

import AutoComInput from "./GoogleAutoComplete"
import StarRatings from "react-star-ratings"


const AddHotel = (props) => {
  const { trip, tripId, tripevents } = useSelector((state) => ({
    trip: state.trips.trip,
    tripId: state.trips.trip.id,
    tripevents: state.trips.trip.tripevents,
  }));
  const [hotelList, setHotelList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hotelEvents, setHotelEvents] = useState([]);
  const [location, setLocation] = useState("");
  const [sortValue,setSortValue] =useState("");

  //dispatch thunk
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get("/api/yelp/hotel", {
      params: { term: searchValue, location },
    });
    setHotelList(data);
  };


   //error handling
useEffect(()=>{

  if(description) {
    let ele = document.getElementById("eventDescription");
    ele.hidden=true
  
  }
},[description])

  useEffect(()=> {
    setStartDate(new Date(`${moment(trip.startDate).format("MM/DD/yyyy")} 4:00 pm`));
    setEndDate(new Date(`${moment(trip.endDate).format("MM/DD/yyyy")} 10:00 am`))
    
},[trip.startDate,trip.endDate])

useEffect(()=>{
  const func = async()=> {
    const { data } = await axios.get("/api/yelp/hotel", {
      params: { term: searchValue, location:trip.destination },
    });
    setHotelList(data);
  }
  func();
},[trip.destination])

  useEffect(() => {
    let list =
      tripevents && tripevents.filter((event) => event.purpose === "SLEEP");
    setHotelEvents(list);
  }, [tripevents]);


//change trip location
  useEffect(() => {
    
 if(trip.destination) {
      setLocation(trip.destination);}
  }, [trip.destination]);

//sort function
  useEffect (()=>{ 
    let list;
    if(sortValue==="rating") {

      list = hotelList.sort(function(a,b) {
       return b.rating-a.rating;
      })

      setHotelList(list);
    }else if(sortValue==="price") {
      list = hotelList.sort(function(a,b) {
        return a.price?a.price.length:0-b.price.length;
       })
       setHotelList(list);
    }

  },[sortValue])

  return (
    <div style={{ padding: "100px" }}>
      <div className="d-lg-flex flex-column align-content-center flex-wrap mr-md-6">
      <table className="table table-hover shadow p-3 mb-5 bg-white rounded ">
      <thead>
          <tr>
          <th scope="col">CheckIn Date Time</th>
            <th scope="col">CheckOut Date Time</th>
            <th scope="col">Hotel Name</th>
            <th scope="col">Hotel Website</th>
            <th scope="col">Hotel Location </th>
            <th scope="col">Delete</th>
          </tr>
          </thead>
          <tbody>
          {hotelEvents &&
            hotelEvents.map((event) =>
                <tr key={event.id}>
                  <td scope="row">{dateFormat(event.startDate,"mm/dd/yyyy h:MM:ss TT")}</td>
                  <td>{dateFormat(event.endDate,"mm/dd/yyyy h:MM:ss TT")}</td>
                  <td>{event.placeName}</td>
                  <td>
                    <a href={event.url} target="_blank">Website Link</a>
                  </td>
                  <td>{event.location}</td>
                  <td>
                    <button
                      type="button" className="btn btn-outline-danger"
                      onClick={() => {
                        dispatch(removeTripEvent(tripId, event.id));
                      }} >
                    <i className="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
            )}
        </tbody>
      </table>

<form onSubmit={handleSubmit}>
  <div className="input-group">
  <span className="input-group-text mr-md-3">You can change a destination or search for a hotel</span>
  <AutoComInput value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }} type="text" aria-label="location" className="form-control" />

  <input value={searchValue}
  placeholder="search for hotel"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }} autoFocus type="text" aria-label="hotel" className="form-control" />

      <button type="submit" className="btn btn-primary input-group-text">Search</button>
  <button type="button" className="btn btn-primary input-group-text mr-md-3"
  onClick={() => {
    setSearchValue("");
  }}
>
  Clear
</button>

<select className="btn btn-primary input-group-text" aria-label=".form-select-lg example" value ={sortValue} onChange={(e)=>{
        setSortValue(e.target.value)
        }}>
      <option>Sort By</option>
        <option value ="rating">rating-High to Low</option>
        <option value ="price">price-Low to High</option>
      </select>
</div>
</form>

<br />
<div>
      <Link to={`/restaurant`} className="btn btn-primary">
        Once hotel is added, go to restaurant
      </Link>
      </div>
</div> 
<br />

      <div className="d-lg-flex flex-row align-content-around flex-wrap mr-md-6">  
        {hotelList.map((hotel) => (
          
          <ul className="shadow-lg mx-auto p-3 d-flex flex-column align-content-center flex-wrap bg-white rounded"
            key={hotel.id}
            style={{ padding: "10%", width:"30%",listStyleType: "none" ,textAlign:"center"}}
          >
            <a href={hotel.url} target="_blank">
              <img
                className="img-thumbnail"
                style={{ width: "300px", height: "300px" }}
                src={hotel.image_url}
              ></img>
            </a>
            <li>{hotel.name}</li>
            <li> <StarRatings
                  rating={hotel.rating}
                  starRatedColor = 'gold'
                  starDimension = '20px'
                  starSpacing = '3px'
                  /></li>
            <li>{hotel.price}</li>
            <li>
              <input
                placeholder="Event description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
            </li>
            <li style={{color:"red"}} id="eventDescription" hidden={true}>Description can not be blank</li>
            <>
              <DatePicker
                placeholderText="CheckIn DateTime"
                timeInputLabel="Pick a Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                withPortal
                dayClassName={(date) => {
                  return date >= new Date(trip.startDate) &&
                    date <= new Date(trip.endDate)
                    ? "highlighted"
                    : undefined;
                }}
              />
              <span style={{color:"red"}}  id="startDate" hidden={true}>CheckIn Date can not be blank</span>
              <DatePicker
                placeholderText="CheckOut DateTime"
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
                dayClassName={(date) => {
                  return date >= new Date(trip.startDate) &&
                    date <= new Date(trip.endDate)
                    ? "highlighted"
                    : undefined;
                }}
              />
              <li style={{color:"red"}}  id="endDate" hidden={true}>CheckOut Date can not be blank</li>
              <li style={{color:"red"}}  id="dateRange" hidden={true}>CheckOut Date can not be earlier than CheckIn Date</li>
            </>

            <button type="button" className="btn btn-outline-secondary "
              onClick={() => {
                if (description && startDate && endDate &&(startDate<endDate)) {
                  dispatch(
                    addTripEvent({
                      purpose: "SLEEP",
                      startDate,
                      endDate,
                      tripId,
                      description,
                      placeName: hotel.name,
                      url: hotel.url,
                      location: hotel.location.display_address.join(", "),
                      yelpId: hotel.id,
                      rating: hotel.rating,
                      priceLevel: hotel.price,
                    })
                  );

                  setStartDate(null);
                  setEndDate(null)
                  setDescription("")
                }else if(!description){
                  let ele = document.getElementById("eventDescription");
                  ele.hidden=false
                  } else if (!startDate){ 
                    let ele = document.getElementById("startDate");
                  ele.hidden=false}
                  else if (!endDate){ 
                    let ele = document.getElementById("startDate");
                  ele.hidden=false}
                  else if(startDate>endDate) {
                    let ele = document.getElementById("dateRange");
                    ele.hidden=false
                  }
              }}
            >
              Add to trip
            </button>
          </ul>
        ))}{" "}
      </div>
    </div>
  );
};

export default AddHotel;
