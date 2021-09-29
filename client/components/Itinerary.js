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

    // if(!this.props.currentTrip) {
    //     return null;
    // }

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

    const tripFromDate = dateFormat(currentTrip.startDate, "mmm d, yyyy");
    const tripToDate = dateFormat(currentTrip.endDate, "mmm d, yyyy");

    let endDate = currentTrip.endDate;
    let startDate = currentTrip.startDate;

    let duration = (new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000 * 3600 * 24);
   
    let tripEvents = this.props.tripevents.reduce((acc, singleEvent) => {
        if(singleEvent.status === 'ACCEPTED') {
            acc.push(singleEvent)
        }
        return acc;
    }, []);
    console.log('TRIP EVENTS', tripEvents);

    // let proposedEvents = tripEvents.filter(singleEvent => singleEvent.status === 'PROPOSED')
    // //console.log('PROPOSED EVENTS', proposedEvents);

    // let acceptedEvents = tripEvents.filter(singleEvent => singleEvent.status === 'ACCEPTED')
    // // console.log('ACCEPTED EVENTS', acceptedEvents);

    // let restaurantProposedEvents = proposedEvents.filter(restaurantEvent => restaurantEvent.purpose === 'BREAKFAST' || restaurantEvent.purpose === 'LUNCH' || restaurantEvent.purpose === 'DINNER');
    // //console.log('RESTAURANT PROPOSED EVENTS', restaurantProposedEvents);

    // let restaurantAcceptedEvents = acceptedEvents.filter(restaurantEvent => restaurantEvent.purpose === 'BREAKFAST' || restaurantEvent.purpose === 'LUNCH' || restaurantEvent.purpose === 'DINNER');
    // // console.log('RESTAURANT ACCEPTED EVENTS', restaurantAcceptedEvents);

    // let sleepProposedEvents = proposedEvents.filter(sleepEvent => sleepEvent.purpose === 'SLEEP');
    // //console.log('SLEEP PROPOSED EVENTS', sleepProposedEvents);

    // let sleepAcceptedEvents = acceptedEvents.filter(sleepEvent => sleepEvent.purpose === 'SLEEP');
    // // console.log('SLEEP ACCEPTED EVENTS', sleepAcceptedEvents);

    // let activityProposedEvents = proposedEvents.filter(activityEvent => activityEvent.purpose === 'SIGHTSEE' || activityEvent.purpose === 'FREETIME' || activityEvent.purpose === 'OTHER');
    // //console.log('ACTIVITY PROPOSED EVENTS', activityProposedEvents);

    // let activityAcceptedEvents = acceptedEvents.filter(activityEvent => activityEvent.purpose === 'SIGHTSEE' || activityEvent.purpose === 'FREETIME' || activityEvent.purpose === 'OTHER');
    // // console.log('ACTIVITY ACCEPTED EVENTS', activityAcceptedEvents);

    // //////////////
    // let activityEvents = tripEvents.filter(event => event.purpose === 'SIGHTSEE' || event.purpose === 'FREETIME' || event.purpose === 'OTHER');


    //ternary statement notes:
    //look for chosenTrip, which will be falsey on the first render
    //on second render it will know that chosenTrip is now defined so it'll be truthy


    // const acceptedEventsMap = acceptedEvents.reduce(function (acc, event) {
    //     if (acc[event.startDate]) {
    //         acc[event.startDate].push(event.description)
    //     }
    //     else {
    //         acc[event.startDate] = [event.description]
    //     }
    //     return acc;
    // }, {})

    // console.log('Accepted Events Map:', acceptedEventsMap);

    // let sortedMap = Object.keys(acceptedEventsMap).sort().reduce(function (result, key) {
    //         result[key] = acceptedEventsMap[key];
    //         return result;
    //     }, {});

    //     console.log('Sorted Accepted Events Map:', sortedMap);




    // const restaurantProposedMap = restaurantProposedEvents.reduce(function (acc, event) {
    //     if (acc[event.startDate]) {
    //         acc[event.startDate].push(event.description)
    //     }
    //     else {
    //         acc[event.startDate] = [event.description]
    //     }
    //     return acc;
    // }, {})

    // //console.log('HASH MAP', hashMap);
    // console.log('RP Map', restaurantProposedMap);

    // const sleepProposedMap = sleepProposedEvents.reduce(function (acc, event) {
    //     if (acc[event.startDate]) {
    //         acc[event.startDate].push(event.description)
    //     }
    //     else {
    //         acc[event.startDate] = [event.description]
    //     }
    //     return acc;
    // }, {})

    // console.log('SP Map', sleepProposedMap);

    // const activityProposedMap = activityProposedEvents.reduce(function (acc, event) {
    //     if (acc[event.startDate]) {
    //         acc[event.startDate].push(event.description)
    //     }
    //     else {
    //         acc[event.startDate] = [event.description]
    //     }
    //     return acc;
    // }, {})

    // console.log('AP Map', activityProposedMap);


    // const activityAcceptedMap = activityAcceptedEvents.reduce(function (acc, event) {
    //     if (acc[event.startDate]) {
    //         acc[event.startDate].push(event.description)
    //     }
    //     else {
    //         acc[event.startDate] = [event.description]
    //     }
    //     return acc;
    // }, {})


    // const activityMap = activityEvents.reduce(function (acc, event) {
    //     if (acc[event.startDate]) {
    //         acc[event.startDate].push(event.description)
    //     }
    //     else {
    //         acc[event.startDate] = [event.description]
    //     }
    //     return acc;
    // }, {})

    // console.log('NEW AP Map', activityMap);

    let attendees = currentTrip.tripattendees.reduce((acc, attendee) => {
        if(attendee.accepted === true) {
            acc.push(attendee.user.name + ' (confirmed!)');
        }
        else {
            acc.push(attendee.user.name + ' (unconfirmed...)');
        }
        return acc;
    }, [])

    console.log('ATTENDEES', attendees)

    const map = {
        "SLEEP": {},
        "ACTIVITY": {},
        "EAT": {}
    }

    const mainMap = tripEvents.reduce((acc, event) => {
        if (event.purpose === 'SLEEP') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.description);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.description]
            }
        }
        else if (event.purpose === 'BREAKFAST' || event.purpose === 'LUNCH' || event.purpose === 'DINNER') {
            if(acc['EAT'][new Date(event.startDate).getDate()]) {
                acc['EAT'][new Date(event.startDate).getDate()].push(event.description);
            }
            else {
                acc['EAT'][new Date(event.startDate).getDate()] = [event.description]
            }
        }
        else if (event.purpose === 'SIGHTSEE' || event.purpose === 'FREETIME' || event.purpose === 'OTHER') {
            if(acc['ACTIVITY'][new Date(event.startDate).getDate()]) {
                acc['ACTIVITY'][new Date(event.startDate).getDate()].push(event.description);
            }
            else {
                acc['ACTIVITY'][new Date(event.startDate).getDate()] = [event.description]
            }
        }
        return acc;
    }, map)

    console.log('MAIN MAP', mainMap);

    // console.log('EAT keys', Object.keys(mainMap["EAT"]));
    // console.log('EAT values for specific date', Object.values(mainMap["EAT"]["2021-10-24T00:00:00.000Z"]));



    function range(start, end) {

        let arr = []
        let current = new Date(start);
      
        while (current <= new Date(end)) {
          arr.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
        return arr;
    }

    let datesArray = range(tripFromDate, tripToDate);
    console.log('dates array', datesArray)
    console.log('NEWWWW', datesArray[0].getDate())
    console.log('DIFFERENT', Object.keys(mainMap["EAT"]))


    

    let num = 1;
        return (
            <div id='content-wrapper-double'>
                <div className='itineraryName'>
                    <h1> {currentTrip ? currentTrip.name : ''} ITINERARY</h1>
                </div>

                <div className='itineraryInfo'>
                    <span className='iiinfo'>DESTINATION: <h3>{currentTrip ? currentTrip.destination : ''}</h3></span>
                    <span className='iiinfo'>PURPOSE: <h3>{currentTrip ? currentTrip.purpose : ''}</h3></span>
                    <span className='iiinfo'>TRIP DURATION: <h3>{duration}</h3> DAYS</span>
                </div>
                {/* <div className='itineraryInfo'>
                    <p><b>Destination:</b> {currentTrip ? currentTrip.destination : ''} <b>Purpose:</b> {currentTrip ? currentTrip.purpose : ''}</p>
                </div>
                <div className='itineraryInfo'>
                    <p><b>Proposed Dates:</b> {tripFromDate} - {tripToDate}</p>
                </div>
                <div className='itineraryInfo'>
                    <p><b>TRIP DURATION:</b> {duration} DAYS</p>
                </div>

                <div id='tripAttendees'>
                    <h4>Attendees:</h4> {currentTrip ? (currentTrip.tripattendees).map(attendee => (
                        <p key={attendee.id}> <b>{attendee.user.name}</b> has confirmed that they are coming on your trip!</p>
                    ))
                    : ''}
                </div> */}
                {/* <b>{dateFormat(item, "mmm d")}</b> */}

{/*  */}
                    {/* <div className="row">
                        <div className="col" >Days</div>
                        {Array(duration).fill('*').map(item => (
                            <div className="col">{num++}</div>
                        ))}
                    </div>
                    <div className="row">
                    {
                        Object.keys(sortedMap).map((item) => (
                            <p key={item} className="individualItem">
                                
                                {sortedMap[`${item}`].map((event) => (
                                        <div className="col">{event}</div>
                                ))}
                            </p>
                        ))
                        }
                    </div> */}

                    <div id="sideBySide">
                        <div id='tripAttendees'>
                            <h4>Attendees:</h4> {attendees ? attendees.map(attendee => (
                                <p> ~ {attendee}</p>
                            ))
                            : ''}
                        </div>
                        {/* <div className="container-f">
                            {Array(duration).fill('*').map(item => (
                                <div className="singleCard">
                                    <div className="dayNum">DAY <br/>{num++}</div>
                                    <div className="card-body">
                                        <b>Date :</b>
                                        <b>Eat : </b>
                                        <b>Activities : </b>
                                        <b>Hotel : </b>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                        {
                            <div className="container-f">
                            {/* { Array(duration).fill('*').map((item) => (
                                <p> */}

                                {/* {
                                        Object.keys(mainMap).map((item) => (
                                            <p>
                                                {mainMap[`${item}`].map((event) => (
                                                        <div> </div>
                                                ))}
                                            </p>
                                        ))
                                    } */}


                                    {
                                        datesArray.map(date => (
                                            <div className="singleCard">
                                            <div className="dayNum">DAY <br/>{num++}</div>
                                            <div key={date} className="card-body">
                                                <b>Date : {date.toDateString()}</b>
                                                <span><b>Eat : </b> { (mainMap["EAT"][date.getDate()]) } </span>
                                                <span><b>Activities : </b> { (mainMap["ACTIVITY"][date.getDate()]) } </span>
                                                <span><b>Hotel : </b> { (Object.values(mainMap["SLEEP"])) } </span>
                                            </div>
                                        </div>
                                        ))
                                    }
                                {/* </p>
                            ))
                            } */}
                            </div>
                        }
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