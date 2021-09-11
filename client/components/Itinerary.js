import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

const Itinerary = ()  => {
    const practiceArray = ['thing1', 'thing2', 'thing3'];
    return (
        <div id='itineraryBox'>
            <div id='itineraryName'>
                <h1>TRIP NAME Itinerary</h1>
            </div>
            <div id='tripDuration'>
                <h2>Trip Duration: # Days</h2>
                <h4>Proposed Dates: # - #</h4>
            </div>
            <div id='eventBox'>

                <div className="category">
                    <div className="eventCategory">
                        <h2>Hotels</h2>
                    </div>
                    <div className='events'>
                        <p>Suggested: </p>
                        <p>Chosen Hotel: </p>
                    </div>
                </div>

                <div className="category">
                    <div className="eventCategory">
                        <h2>Restaurants</h2>
                    </div>
                    <div className='events'>
                        <p>Suggested: </p>
                        <p>Chosen Restaurants: </p>
                    </div>
                </div>

                <div className="category">
                    <div className="eventCategory">
                        <h2>Activities</h2>
                    </div>
                    <div className='events'>
                        <p>Suggested: {practiceArray.map((item) => (
                            <div className="individualItem">
                                {item}
                            </div>
                        ))
                        }
                        </p>
                        <p>Chosen Activities: Restaurant 1</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(Itinerary)