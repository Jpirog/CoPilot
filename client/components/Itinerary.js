import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"
//import axios from "axios";
import { connect } from 'react-redux';
//import TripAttendees from './TripAttendees';
const dateFormat = require("dateformat");

class Itinerary extends React.Component {
    constructor(props) {
        super(props);
    }

    // async componentDidMount() {
    //     await this.props.getTripDetails();
    // }

    render () {
    //every component you write needs a check like this because otherwise you'll run into a lot of undefined variables that haven't been populated yet on the first run
    //check if tripevents is defined, on second run it will run componentDidMount and tripevents will be defined
    if(!this.props.tripevents) {
        return null;
    }

    const currentTrip = this.props.currentTrip;
    console.log('CURRENT TRIP', currentTrip);
    // const trips = this.props.trips;
    // const allTrips = [...this.props.trips.userCreatedTrips, ...this.props.trips.userInvitedTrips];
    // const chosenTrip = allTrips.find((trip) => trip.id === (this.props.match.params.tripId) * 1)

    const tripAttendees = this.props.tripAttendees;
    console.log('TA', tripAttendees);

    //console.log('MATCH PARAMS:', this.props.match.params.tripId);

    // console.log('TRIPS', trips)
    // console.log('chosenTrip:', chosenTrip);
    // console.log('allTrips', allTrips)
    // console.log('MPTI', typeof this.props.match.params.tripId);
    // console.log('tt', trips[0] ? typeof trips[0].id : '');

    const tripFromDate = dateFormat(currentTrip.startDate, "mmm d");
    const tripToDate = dateFormat(currentTrip.endDate, "mmm d");

    let tripEvents = this.props.tripevents;
    console.log('TRIP EVENTS', tripEvents);

    let proposedEvents = tripEvents.filter(singleEvent => singleEvent.status === 'PROPOSED')
    //console.log('PROPOSED EVENTS', proposedEvents);

    let acceptedEvents = tripEvents.filter(singleEvent => singleEvent.status === 'ACCEPTED')
    // console.log('ACCEPTED EVENTS', acceptedEvents);

    let restaurantProposedEvents = proposedEvents.filter(restaurantEvent => restaurantEvent.purpose === 'BREAKFAST' || restaurantEvent.purpose === 'LUNCH' || restaurantEvent.purpose === 'DINNER');
    //console.log('RESTAURANT PROPOSED EVENTS', restaurantProposedEvents);

    let restaurantAcceptedEvents = acceptedEvents.filter(restaurantEvent => restaurantEvent.purpose === 'BREAKFAST' || restaurantEvent.purpose === 'LUNCH' || restaurantEvent.purpose === 'DINNER');
    // console.log('RESTAURANT ACCEPTED EVENTS', restaurantAcceptedEvents);

    let sleepProposedEvents = proposedEvents.filter(sleepEvent => sleepEvent.purpose === 'SLEEP');
    //console.log('SLEEP PROPOSED EVENTS', sleepProposedEvents);

    let sleepAcceptedEvents = acceptedEvents.filter(sleepEvent => sleepEvent.purpose === 'SLEEP');
    // console.log('SLEEP ACCEPTED EVENTS', sleepAcceptedEvents);

    let activityProposedEvents = proposedEvents.filter(activityEvent => activityEvent.purpose === 'SIGHTSEE' || activityEvent.purpose === 'FREETIME' || activityEvent.purpose === 'OTHER');
    //console.log('ACTIVITY PROPOSED EVENTS', activityProposedEvents);

    let activityAcceptedEvents = acceptedEvents.filter(activityEvent => activityEvent.purpose === 'SIGHTSEE' || activityEvent.purpose === 'FREETIME' || activityEvent.purpose === 'OTHER');
    // console.log('ACTIVITY ACCEPTED EVENTS', activityAcceptedEvents);

    //////////////
    let activityEvents = tripEvents.filter(event => event.purpose === 'SIGHTSEE' || event.purpose === 'FREETIME' || event.purpose === 'OTHER');


    //ternary statement notes:
    //look for chosenTrip, which will be falsey on the first render
    //on second render it will know that chosenTrip is now defined so it'll be truthy

    const restaurantProposedMap = restaurantProposedEvents.reduce(function (acc, event) {
        if (acc[event.startDate]) {
            acc[event.startDate].push(event.description)
        }
        else {
            acc[event.startDate] = [event.description]
        }
        return acc;
    }, {})

    //console.log('HASH MAP', hashMap);
    console.log('RP Map', restaurantProposedMap);

    const sleepProposedMap = sleepProposedEvents.reduce(function (acc, event) {
        if (acc[event.startDate]) {
            acc[event.startDate].push(event.description)
        }
        else {
            acc[event.startDate] = [event.description]
        }
        return acc;
    }, {})

    console.log('SP Map', sleepProposedMap);

    const activityProposedMap = activityProposedEvents.reduce(function (acc, event) {
        if (acc[event.startDate]) {
            acc[event.startDate].push(event.description)
        }
        else {
            acc[event.startDate] = [event.description]
        }
        return acc;
    }, {})

    console.log('AP Map', activityProposedMap);


    const activityAcceptedMap = activityAcceptedEvents.reduce(function (acc, event) {
        if (acc[event.startDate]) {
            acc[event.startDate].push(event.description)
        }
        else {
            acc[event.startDate] = [event.description]
        }
        return acc;
    }, {})


    const activityMap = activityEvents.reduce(function (acc, event) {
        if (acc[event.startDate]) {
            acc[event.startDate].push(event.description)
        }
        else {
            acc[event.startDate] = [event.description]
        }
        return acc;
    }, {})

    console.log('NEW AP Map', activityMap);

        return (
            <div id='content-wrapper'>
                <div className='itineraryInfo'>
                    <h1> {currentTrip ? currentTrip.name : ''} Itinerary</h1>
                </div>
                <div className='itineraryInfo'>
                    <p><b>Destination:</b> {currentTrip ? currentTrip.destination : ''} <b>Purpose:</b> {currentTrip ? currentTrip.purpose : ''}</p>
                </div>
                {/* <div className='itineraryPurpose'>
                    <p><b>Purpose:</b> {currentTrip ? currentTrip.purpose : ''} </p>
                </div> */}
                <div className='itineraryInfo'>
                    <p><b>Proposed Dates:</b> {tripFromDate} - {tripToDate}</p>
                </div>

                <div id='tripAttendees'>
                    <h4>Attendees:</h4> {currentTrip ? (currentTrip.tripattendees).map(attendee => (
                          <p key={attendee.id}> <b>{attendee.user.name}</b> has confirmed that they are coming on your trip!</p>
                    ))
                    : ''}
                </div>

                <div id='eventBox'>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Hotels</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4> 
                            {/* {
                            sleepProposedEvents.map((item) => (
                                <p key={item.id} className="individualItem">
                                    {item.description}
                                    {item.startDate}
                                    {item.endDate}
                                </p>
                            ))
                            } */}

{
                            Object.keys(sleepProposedMap).map((item) => (
                                <p key={item} className="individualItem">
                                    <b>{dateFormat(item, "mmm d")}</b>
                                    {sleepProposedMap[`${item}`].map((sleep) => (
                                        <div className='proposedItems'>
                                            {sleep}
                                        </div>
                                    ))}
                                </p>
                            ))
                            }

                        </div>
                        {/* <div className='events'>
                            <h4>Chosen:</h4> 
                            {sleepAcceptedEvents.map((item) => (
                                <p key={item.id} className="individualItem">
                                    {item.description}
                                    {item.startDate}
                                    {item.endDate}
                                </p>
                            ))
                            }
                        </div> */}
                    </div>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Restaurants</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4>
                                {/* {restaurantProposedEvents.map((item) => (
                                <p key={item.id} className="individualItem">
                                    {item.description}
                                </p>
                            ))
                            } */}
                            {
                            Object.keys(restaurantProposedMap).map((item) => (
                                <p key={item} className="individualItem">
                                    <b>{dateFormat(item, "mmm d")}</b>
                                    {restaurantProposedMap[`${item}`].map((restaurant) => (
                                        <div className='proposedItems'>
                                            {restaurant}
                                        </div>
                                    ))}
                                </p>
                            ))
                            }
                        </div>
                        {/* <div className='events'>
                            <h4>Chosen:</h4> 
                            {restaurantAcceptedEvents.map((item) => (
                                <p key={item.id} className="individualItem">
                                    {item.description}
                                    {item.startDate}
                                    {item.endDate}
                                </p>
                            ))
                            }
                        </div> */}
                    </div>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Activities</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4>
                            {/* {activityProposedEvents.map((item) => (
                                <div key={item.id} className="individualItem">
                                    {item.description}
                                </div>
                            ))
                            } */}

                                { Object.keys(activityProposedMap).map((item) => (
                                <p key={item} className="individualItem">
                                    <b>{dateFormat(item, "mmm d")}</b>
                                    {activityProposedMap[`${item}`].map((activity) => (
                                        <div className='proposedItems'>
                                            {activity}
                                        </div>
                                    ))}
                                </p>
                            ))
                            
                            }

                            
                            {/* { Object.keys(activityAcceptedMap).map((item2) => (
                                        <p key={item2} className="individualItem">
                                            {activityAcceptedMap[`${item2}`].map((activity2) => (
                                                <div className='acceptedItems'>
                                                    {activity2}
                                                </div>
                                            ))}
                                        </p>
                                    ))} */}

                        </div>
                        {/* <div className='events'>
                            <h4>Chosen:</h4>
                            {activityAcceptedEvents.map((item) => (
                                <div key={item.id} className="individualItem">
                                    {item.description}
                                    {item.startDate}
                                    {item.endDate}
                                </div>
                            ))
                            }
                        </div> */}
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
        tripevents: state.trips.trip.tripevents,
        tripAttendees: state.trips.trip.tripattendees
    }
}

// const mapDispatchToProps = {
//     getTripDetails
// }

export default connect(mapStateToProps)(Itinerary);