import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"

//need to use user's id to access all trips/trip ids/ trip info to fill out the trip cards

const AllTrips= (props)=> {
    
    const practiceTripsArray = ['trip1', 'trip2', 'trip3'];
return (
    <div id='allTripsPage'>
        <div id='pageTitle'>
            <h1>Your Trips:</h1>
        </div>
        <div id='tripPageSort'>
            div for sort 
        </div>
        <div className='allTripsCards'>
            {practiceTripsArray.map((trip) => (
                <div className='singleTripCard'> 
                <p>{/* key of each trip card will be that trip's id # */}
                    <div className='tripInfo'>
                        <p>Trip Name: {trip}</p>
                        <p>Destination: something here</p>
                        <p>Dates: # - #</p>
                    </div>
                </p>
                    <button className='moreDetails'>
                        More Details
                    </button>
                </div>
            ))}
        </div>
    </div>
)


}

export default AllTrips