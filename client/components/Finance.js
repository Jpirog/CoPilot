import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

class Financials extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div id='content-wrapper'>
                <h1 id='financialsHeader'>
                    Let's Check Those Financials!
                </h1>
                <form className='financialsForms'>
                    <h3>Costs for Hotels</h3>
                    <label htmlFor="hotelAmount">Total for Hotel Stay: </label>
                    <input type="text" id='hotelAmount' name='hotelAmount' value='$' />
                    {/* Add button that will allow user to add another hotel label and input in this form */}
                    <br/>
                    <div className='addingMore'>
                        <button>+ Hotel</button>
                    </div>
                </form>
                <form className='financialsForms'>
                    <h3>Costs for Restaurants</h3>
                    <label htmlFor="restaurantAmount">Total for Restaurant: </label>
                    <input type="text" id='restaurantAmount' name='restaurantAmount' value='$' />
                    {/* Add button that will allow user to add another restaurant label and input in this form */}
                    <br/>
                    <div className='addingMore'>
                        <button>+ Restaurant</button>
                    </div>
                    
                </form>
                <form className='financialsForms'>
                <h3>Costs for Activities</h3>
                    <label htmlFor="activityAmount">Total for Activity: </label>
                    <input type="text" id='activityAmount' name='activityAmount' value='$' />
                    {/* Add button that will allow user to add another activity label and input in this form */}
                    <br/>
                    <div className='addingMore'>
                        <button>+ Activity</button>
                    </div>
                </form>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = {

}

export default connect (mapStateToProps)(Financials);