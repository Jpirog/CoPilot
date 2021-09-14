import React, { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getTripDetails,addTripEvent,removeTripEvent} from "../store/trips"
//import axios from "axios";
import { connect } from 'react-redux';

//need to use trip id in url to display specific itinerary for that specific trip

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

    //const chosenTrip = this.props.trips.filter((trip) => trip.id === this.props.match.params.id)[0];
    console.log('MATCH PARAMS:', this.props.match.params.id);
    console.log('TRIPS', state.trips)
    console.log('chosenTrip:', chosenTrip);
        return (
            <div id='itineraryBox'>
                <div id='itineraryName'>
                    <h1>TRIP NAME Itinerary</h1>
                </div>
                <div className='tripDuration'>
                    <h3>Trip Duration: # Days</h3>
                </div>
                <div className='tripDuration'>
                    <p>Proposed Dates: # - #</p>
                </div>
                <div id='eventBox'>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Hotels</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4> 
                            <p>{practiceSuggestedArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                            </p>
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4> 
                            <p>{practiceChosenArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                            </p>
                        </div>
                    </div>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Restaurants</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4>
                                <p>{practiceSuggestedArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                            </p>
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4> 
                            <p>{practiceChosenArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                            </p>
                        </div>
                    </div>

                    <div className="category">
                        <div className="eventCategory">
                            <h1>Activities</h1>
                        </div>
                        <div className='events'>
                            <h4>Suggested:</h4>
                            <p>{practiceSuggestedArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                            </p>
                        </div>
                        <div className='events'>
                            <h4>Chosen:</h4>
                            <p> {practiceChosenArray.map((item) => (
                                <div className="individualItem">
                                    {item}
                                </div>
                            ))
                            }
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    }
}

const mapDispatchToProps = {
    getTripDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);