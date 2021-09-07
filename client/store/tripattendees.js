import axios from 'axios';
import store from './index';

//* ACTION TYPES

const ADD_TRIP_ATTENDEE = 'ADD_TRIP_ATTENDEE';
const REMOVE_TRIP_ATTENDEE = 'REMOVE_TRIP_ATTENDEE';
const UPDATE_TRIP_ATTENDEE = 'CHANGE_TRIP_ATTENDEE';

// * ACTION CREATORS

const _addTripAttendee = attendee => {
  return {
    type: ADD_TRIP_ATTENDEE, 
    attendee,
  }
};

const _removeTripAttendee = attendee => {
  return {
    type: REMOVE_TRIP_ATTENDEE, 
    attendee,
  }
};

const _updateTripAttendee = attendee => {
  return {
    type: UPDATE_TRIP_ATTENDEE, 
    attendee,
  }
};


// * THUNK CREATORS

// addTripAttendee adds an attendee to a trip
export const addTripAttendee = (attendee) => {
  return async (dispatch) => { 
    try{
      const { data: newAttendee } = await axios.post('/api/tripattendees', attendee);
      dispatch(_addTripAttendee(newAttendee));
    }
    catch(ex){
      console.log('ERROR adding trip attendee', ex);
    }
  }
}

// removeTripAttendee removes an attendee from a trip
export const removeTripAttendee = (tripId, email) => {
  return async (dispatch) => { 
    try{
      const { data: deleted } = await axios.delete('/api/tripattendees', {data: { tripId: tripId, email: email}});
      dispatch(_removeTripAttendee(deleted));
    }
    catch(ex){
      console.log('ERROR deleting trip attendee', ex);
    }
  }
}

// changeTripAttendee changes an existing attendee to a trip
export const updateTripAttendee = (attendee) => {
  return async (dispatch) => { 
    try{
      const { data: updatedAttendee } = await axios.put('/api/tripattendees', attendee);
      dispatch(_updateTripAttendee(attendee));
    }
    catch(ex){
      console.log('ERROR updating trip attendee', ex);
    }
  }
}


// * REDUCER

export default function(state = {trip: {}, userCreatedTrips: [], userInvitedTrips: []}, action) {

  switch (action.type) {
    case ADD_TRIP_ATTENDEE:
      return {...state, trip: action.trip}
    case REMOVE_TRIP_ATTENDEE:
      return {...state, userCreatedTrips: action.userCreatedTrips}
    case UPDATE_TRIP_ATTENDEE:
      return {...state, userInvitedTrips: action.userInvitedTrips}
    default:
      return state
  }
}
