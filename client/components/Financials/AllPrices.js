import React from 'react';
import { connect } from 'react-redux';
import Total from './Total';
import AllExpenses from './AllExpenses';
import AddExpense from './AddExpense';

class AllPrices extends React.Component {
    constructor(props) {
        super(props);
    }


    render () {
        console.log('state', this.props.currentTrip);
        console.log('prices', this.props.prices);
        return (
            <div id='content-wrapper-third'>
                <h1>Financials</h1>
                
                <div>
                    <Total />
                </div>

                <h4>Expenses:</h4>
                <AllExpenses />

                <div>
                    <h3>Add Expense:</h3>
                    <AddExpense />
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
        tripAttendees: state.trips.trip.tripattendees,
        prices: state.trips.trip.prices
    }
}

export default connect(mapStateToProps)(AllPrices);