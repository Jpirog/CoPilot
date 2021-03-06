import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"
//import axios from "axios";
import { connect } from 'react-redux';
//import TripAttendees from './TripAttendees';
const dateFormat = require("dateformat");
import { Toaster } from 'react-hot-toast';


class Itinerary extends React.Component {
    constructor(props) {
        super(props);
    }

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

    // let duration = (new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000 * 3600 * 24);
   
    // below only needed if you want to display accepted events only
    // let tripEvents = this.props.tripevents.reduce((acc, singleEvent) => {
    //     if(singleEvent.status === 'ACCEPTED') {
    //         acc.push(singleEvent)
    //     }
    //     return acc;
    // }, []);
    // console.log('TRIP EVENTS', tripEvents);

    // used to great mainMap
    let allEvents = this.props.tripevents;

    let attendees = currentTrip.tripattendees.reduce((acc, attendee) => {
        if(attendee.accepted === true) {
            acc.push(attendee.user.name + ' (confirmed!)');
        }
        else {
            acc.push(attendee.user ? attendee.user.name + ' (unconfirmed...)' : attendee.email + ' (unconfirmed...)');
        }
        return acc;
    }, [])

    console.log('ATTENDEES', attendees)

    const map = {
        "Sleep": {},
        "Breakfast": {},
        "Lunch": {},
        "Dinner": {},
        "Other": {},
        "Morning activity": {},
        "Afternoon activity": {},
        "Night activity": {},
    }

    const mainMap = allEvents.reduce((acc, event) => {
        if (event.purpose === 'Sleep') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
            }
        }
        else if (event.purpose === 'Breakfast') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
            }
        }
        else if (event.purpose === 'Lunch') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
            }
        }
        else if (event.purpose === 'Dinner') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
            }
        }
        else if (event.purpose === 'Morning activity') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
            }
        }
        else if (event.purpose === 'Afternoon activity') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
            }
        }
        else if (event.purpose === 'Night activity') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
            }
        }
        else if (event.purpose === 'Other') {
            if(acc[event.purpose][new Date(event.startDate).getDate()]) {
                acc[event.purpose][new Date(event.startDate).getDate()].push(event.placeName);
            }
            else {
                    acc[event.purpose][new Date(event.startDate).getDate()] = [event.placeName]
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
    console.log('DIFFERENT', Object.keys(mainMap["Lunch"]))

    console.log('afternnon activities array', (mainMap["Afternoon activity"][22]))


    function formatter(array) {
        //console.log('diff arr', array);
        if (!array) {
            return false;
        }
        return array.join(', ')
    }
    

    let num = 1;
        return (
            <div id='content-wrapper-third'>
                <div className='itineraryName'>
                    <h1> {currentTrip ? currentTrip.name : ''} ITINERARY</h1>
                </div>
                <Toaster />
                <div className='itineraryInfo'>
                    <span className='iiinfo'>DESTINATION: <h3>{currentTrip ? currentTrip.destination : ''}</h3></span>
                    <span className='iiinfo'>PURPOSE: <h3>{currentTrip ? currentTrip.purpose : ''}</h3></span>
                    <span className='iiinfo'>TRIP DURATION: <h3>{datesArray.length}</h3> DAYS</span>
                </div>

                    <div id="sideBySide">
                        <div id='tripAttendees'>
                            <h4>Attendees:</h4> {attendees ? attendees.map(attendee => (
                                <p key={attendee}> ~ {attendee}</p>
                            ))
                            : ''}
                        </div>
                        {
                            <div className="container-f">

                                    {
                                        datesArray.map(date => { 
                                            const formatterBreakfast = formatter(mainMap["Breakfast"][date.getDate()])
                                            const formatterLunch = formatter(mainMap["Lunch"][date.getDate()])
                                            const formatterDinner = formatter(mainMap["Dinner"][date.getDate()])
                                            const formatterMorning = formatter(mainMap["Morning activity"][date.getDate()])
                                            const formatterAfternoon = formatter(mainMap["Afternoon activity"][date.getDate()])
                                            const formatterNight = formatter(mainMap["Night activity"][date.getDate()])
                                            const formatterOther = formatter(mainMap["Other"][date.getDate()])
                                            return (
                                                <div className="singleCard" key={date.toDateString()}>
                                                <div className="dayNum">
                                                    <p id='numDay'>DAY <br/>{num++}</p>
                                                    <p id='dayDate'>{date.toDateString()}</p>
                                                </div>
                                                <div key={date} className="card-body">
                                                    {/* <b className='singleInfoSection'>Date : {date.toDateString()}</b> */}
                                                    <div className='purposeSection'>
                                                        { mainMap && <span className='activitiesList'><b>Breakfast : </b> { formatterBreakfast ? formatterBreakfast : 'No Events Yet!'} </span>}
                                                        { mainMap && <span className='activitiesList'><b>Lunch : </b> { formatterLunch ? formatterLunch : 'No Events Yet!'} </span>}
                                                        { mainMap && <span className='activitiesList'><b>Dinner : </b> { formatterDinner ? formatterDinner : 'No Events Yet!'} </span>}
                                                    </div>
                                                    <div className='purposeSection'>
                                                        { mainMap && <span className='activitiesList'><b>Morning Activities : </b> { formatterMorning ? formatterMorning : 'No Events Yet!'} </span>}
                                                        { mainMap && <span className='activitiesList'><b>Afternoon Activities : </b> { formatterAfternoon ? formatterAfternoon : 'No Events Yet!'} </span>}
                                                        { mainMap && <span className='activitiesList'><b>Night Activities : </b> { formatterNight ? formatterNight : 'No Events Yet!'} </span>}
                                                        { mainMap && <span className='activitiesList'><b>Other : </b> { formatterOther? formatterOther : 'No Events Yet!'} </span>}
                                                    </div>
                                                    <span className='singleInfoSection'><b>Hotel : </b> { (Object.values(mainMap["Sleep"])) } </span>
                                                </div>
                                            </div>
                                            )
                                        })
                                    }
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

export default connect(mapStateToProps)(Itinerary);