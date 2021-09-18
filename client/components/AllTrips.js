import axios from "axios";
import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"
import { connect } from 'react-redux';
import dateFormat from "dateformat";

//need to use user's id to access all trips/trip ids/ trip info to fill out the trip cards

class AllTrips extends React.Component {
    constructor(props) {
        super(props);
    }
    
    async componentDidMount() {
        await this.props.getTripDetails();
    }

    render() {
    const practiceTripsArray = ['trip1', 'trip2', 'trip3'];

    const trips = this.props.trips;
    const allTrips = [...this.props.trips.userCreatedTrips, ...this.props.trips.userInvitedTrips];
    console.log('ALL TRIPS', allTrips)
    
        return (
            <div id='content-wrapper'>
                <div id='pageTitle'>
                    <h1>Your Trips:</h1>
                </div>
                <div id='tripPageSort'>
                    div for sort 
                </div>
                <div className='allTripsCards'>
                    {allTrips.map((trip) => (
                        <div className='singleTripCard'> 
                        <p>{/* key of each trip card will be that trip's id # */}
                            <div className='tripInfo'>
                                <p>Trip Name: {trip.destination}</p>
                                <p>Destination: {trip.destination}</p>
                                <p>Dates: {dateFormat(trip.startDate, "mmm d")} - {dateFormat(trip.endDate, "mmm d")}</p>
                            </div>
                        </p>
                            <Link to='/itinerary'>
                                <button className='moreDetails'>
                                    More Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentTrip: state.trips.trip,
        trips: state.trips,
        tripevents: state.trips.trip.tripevents
    }
}

const mapDispatchToProps = {
    getTripDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTrips);