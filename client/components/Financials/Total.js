import React from 'react';
import { connect } from 'react-redux';

class Total extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.prices) {
            return null;
        }


        let prices = this.props.prices

        //console.log('type', typeof prices[0].price)
        let sum = prices.reduce((acc, priceObj) => {
            acc += priceObj.price;
            return acc;
        }, 0)

        return (
            <div>
                <h3>Total so Far: ${sum} </h3>
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        currentTrip: state.trips.trip,
        prices: state.trips.trip.prices
    }
}

export default connect(mapStateToProps)(Total);