import axios from 'axios';
import store from './index';

//* ACTION TYPES

const GET_TRIP_DETAILS = 'GET_TRIP_DETAILS';

// * ACTION CREATORS
const _getTripDetails = trip => {
  return {
    type: GET_TRIP_DETAILS, 
    trip
  }
};

// * THUNK CREATORS

export const getTripDetails = (tripId) => {
  return async (dispatch) => { 
    try{
      const { data: trip } = await axios.get(`/api/trips/${tripId}`);
      dispatch(_getTripDetails(trip));
    }
    catch(ex){
      console.log('ERROR getting trip details', ex);
    }
  }
}

// * REDUCER

export default function(state = {trip: {}, trips: {}}, action) {

  switch (action.type) {
    case GET_TRIP_DETAILS:
      return action.trip
    default:
      return state
  }
}
