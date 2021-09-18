import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"
//import axios from "axios";
import { connect } from 'react-redux';
const dateFormat = require("dateformat");

class Itinerary extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.props.getTripDetails();
    }

    render () {
    //every component you write needs a check like this because otherwise you'll run into a lot of undefined variables that haven't been populated yet on the first run
    //check if tripevents is defined, on second run it will run componentDidMount and tripevents will be defined
    if(!this.props.tripevents) {
        return null;
    }

    const currentTrip = this.props.currentTrip;
    // const trips = this.props.trips;
    // const allTrips = [...this.props.trips.userCreatedTrips, ...this.props.trips.userInvitedTrips];
    // const chosenTrip = allTrips.find((trip) => trip.id === (this.props.match.params.tripId) * 1)


    //console.log('MATCH PARAMS:', this.props.match.params.tripId);

    // console.log('TRIPS', trips)
    // console.log('chosenTrip:', chosenTrip);
    // console.log('allTrips', allTrips)

    console.log('CURRENT TRIP', currentTrip);
    // console.log('MPTI', typeof this.props.match.params.tripId);
    // console.log('tt', trips[0] ? typeof trips[0].id : '');

    const fromDate = dateFormat(currentTrip.startDate, "mmm d");
    const toDate = dateFormat(currentTrip.endDate, "mmm d");

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

    let sleepProposedEvents = proposedEvents.filter(sleepEvent => sleepEvent.purpose === 'SLEEP');
    console.log('SLEEP PROPOSED EVENTS', sleepProposedEvents);

    let sleepAcceptedEvents = acceptedEvents.filter(sleepEvent => sleepEvent.purpose === 'SLEEP');
    console.log('SLEEP ACCEPTED EVENTS', sleepAcceptedEvents);

    let activityProposedEvents = proposedEvents.filter(activityEvent => activityEvent.purpose === 'SIGHTSEE' || activityEvent.purpose === 'FREETIME' || activityEvent.purpose === 'OTHER');
    console.log('ACTIVITY PROPOSED EVENTS', activityProposedEvents);

    let activityAcceptedEvents = acceptedEvents.filter(activityEvent => activityEvent.purpose === 'SIGHTSEE' || activityEvent.purpose === 'FREETIME' || activityEvent.purpose === 'OTHER');
    console.log('ACTIVITY ACCEPTED EVENTS', activityAcceptedEvents);

    //ternary statement notes:
    //look for chosenTrip, which will be falsey on the first render
    //on second render it will know that chosenTrip is now defined so it'll be truthy

        return (
            <div id='content-wrapper'>
                <div id='itineraryName'>
                    <h1> {currentTrip ? currentTrip.destination : ''} Itinerary</h1>
                </div>
                {/* <div className='tripDuration'>
                    <h3>Trip Duration: {`${(currentTrip ? currentTrip.startDate : '') - (currentTrip ? currentTrip.endDate : '')}`} Days</h3>
                </div> */}
                <div className='tripDuration'>
                    <p>Proposed Dates: {fromDate} - {toDate}</p>
                </div>
                <div id='eventBox'>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Hotels</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4> 
                            {
                            sleepProposedEvents.map((item) => (
                                <p className="individualItem">
                                    {item.description}
                                </p>
                            ))
                            }
                            
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4> 
                            {sleepAcceptedEvents.map((item) => (
                                <p className="individualItem">
                                    {item.description}
                                </p>
                            ))
                            }
                        </div>
                    </div>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Restaurants</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4>
                                {restaurantProposedEvents.map((item) => (
                                <p className="individualItem">
                                    {item.description}
                                </p>
                            ))
                            }
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4> 
                            {restaurantAcceptedEvents.map((item) => (
                                <p className="individualItem">
                                    {item.description}
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
                            {activityProposedEvents.map((item) => (
                                <div className="individualItem">
                                    {item.description}
                                </div>
                            ))
                            }
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4>
                            {activityAcceptedEvents.map((item) => (
                                <div className="individualItem">
                                    {item.description}
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