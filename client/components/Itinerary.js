import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"
//import axios from "axios";
import { connect } from 'react-redux';

//need to use trip id in url to display specific itinerary for that specific trip


//const fromDate = dateFormat(trip.fromDate, "ddd, mmm d, yyyy");

class Itinerary extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.props.getTripDetails();
    }

    render () {
    const practiceSuggestedArray = ['Fernando Grill', 'Best Place Ever', 'A Cool Place'];
    const practiceChosenArray = ['Best Place Ever', 'A Cool Place'];


    //every component you write needs a check like this because otherwise you'll run into a lot of undefined variables that haven't been populated yet on the first run
    //check if tripevents is defined, on second run it will run componentDidMount and tripevents will be defined
    if(!this.props.tripevents) {
        return null;
    }

    const trips = this.props.trips;
    const allTrips = [...this.props.trips.userCreatedTrips, ...this.props.trips.userInvitedTrips];
    const chosenTrip = allTrips.find((trip) => trip.id === (this.props.match.params.tripId) * 1)


    //console.log('MATCH PARAMS:', this.props.match.params.tripId);
    console.log('TRIPS', trips)
    console.log('chosenTrip:', chosenTrip);
    console.log('allTrips', allTrips)
    // console.log('MPTI', typeof this.props.match.params.tripId);
    // console.log('tt', trips[0] ? typeof trips[0].id : '');


    let tripEvents = this.props.tripevents;
    console.log('TRIP EVENTS', tripEvents);

    let proposedEvents = tripEvents.filter(singleEvent => singleEvent.status === 'PROPOSED')
    console.log('PROPOSED EVENTS', proposedEvents);

    let acceptedEvents = tripEvents.filter(singleEvent => singleEvent.status === 'ACCEPTED')
    console.log('ACCEPTED EVENTS', acceptedEvents);

    let restaurantProposedEvents = proposedEvents.filter(restaurantEvent => restaurantEvent.purpose === 'BREAKFAST' || restaurantEvent.purpose === 'LUNCH' || restaurantEvent.purpose === 'DINNER');
    console.log('RESTAURANT PROPOSED EVENTS', restaurantProposedEvents);

    let restaurantAcceptedEvents = acceptedEvents.filter(restaurantEvent => restaurantEvent.purpose === 'BREAKFAST' || restaurantEvent.purpose === 'LUNCH' || restaurantEvent.purpose === 'DINNER');
    console.log('RESTAURANT ACCEPTED EVENTS', restaurantAcceptedEvents);

    let hotelProposedEvents = proposedEvents.filter(hotelEvent => hotelEvent.purpose === 'HOTEL');
    console.log('HOTEL PROPOSED EVENTS', hotelProposedEvents);

    let hotelAcceptedEvents = acceptedEvents.filter(hotelEvent => hotelEvent.purpose === 'HOTEL');
    console.log('HOTEL ACCEPTED EVENTS', hotelAcceptedEvents);

    let activityProposedEvents = proposedEvents.filter(activityEvent => activityEvent.purpose === 'ACTIVITY');
    console.log('ACTIVITY PROPOSED EVENTS', activityProposedEvents);

    let activityAcceptedEvents = acceptedEvents.filter(activityEvent => activityEvent.purpose === 'ACTIVITY');
    console.log('ACTIVITY ACCEPTED EVENTS', activityAcceptedEvents);

    //ternary statement notes:
    //look for chosenTrip, which will be falsey on the first render
    //on second render it will know that chosenTrip is now defined so it'll be truthy

        return (
            <div id='itineraryBox'>
                <div id='itineraryName'>
                    <h1> {chosenTrip ? chosenTrip.destination : ''} Itinerary</h1>
                </div>
                <div className='tripDuration'>
                    <h3>Trip Duration: {`${(chosenTrip ? chosenTrip.startDate : '') - (chosenTrip ? chosenTrip.endDate : '')}`} Days</h3>
                </div>
                <div className='tripDuration'>
                    <p>Proposed Dates: {chosenTrip ? chosenTrip.startDate : ''} - {chosenTrip ? chosenTrip.endDate : ''}</p>
                </div>
                <div id='eventBox'>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Hotels</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4> 
                            {proposedEvents.map((item) => (
                                <p className="individualItem">
                                    {item.description}
                                </p>
                            ))
                            }
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4> 
                            {/* {acceptedEvents.map((item) => (
                                <p className="individualItem">
                                    {item}
                                </p>
                            ))
                            } */}
                        </div>
                    </div>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Restaurants</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4>
                                {practiceSuggestedArray.map((item) => (
                                <p className="individualItem">
                                    {item}
                                </p>
                            ))
                            }
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4> 
                            {practiceChosenArray.map((item) => (
                                <p className="individualItem">
                                    {item}
                                </p>
                            ))
                            }
                        </div>
                    </div>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Activities</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4>
                            {practiceSuggestedArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4>
                            {practiceChosenArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                        </div>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);