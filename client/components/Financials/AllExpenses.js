import React from 'react';
import { connect } from 'react-redux';

class AllExpenses extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {

        if(!this.props.prices) {
            return null;
        }


        let prices = this.props.prices
        return (
            <ul>
                {prices.map(item => (
                    <li>${item.price}</li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentTrip: state.trips.trip,
        prices: state.trips.trip.prices
    }
}

export default connect(mapStateToProps)(AllExpenses);