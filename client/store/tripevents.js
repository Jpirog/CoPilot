import axios from 'axios';
import store from './index';

//* ACTION TYPES

const ADD_TRIP_EVENT = 'ADD_TRIP_EVENT';
const REMOVE_TRIP_EVENT = 'REMOVE_TRIP_EVENT';
const UPDATE_TRIP_EVENT = 'CHANGE_TRIP_EVENT';

// * ACTION CREATORS

const _addTripEvent = event => {
  return {
    type: ADD_TRIP_EVENT, 
    event,
  }
};

const _removeTripEvent = event => {
  return {
    type: REMOVE_TRIP_EVENT, 
    event,
  }
};

const _updateTripEvent = event => {
  return {
    type: UPDATE_TRIP_EVENT, 
    event,
  }
};


// * THUNK CREATORS

// addTripEvent adds an event to a trip
export const addTripEvent = (event) => {
  return async (dispatch) => { 
    try{
      const { data: newEvent } = await axios.post('/api/tripevents', event);
      dispatch(_addTripEvent(newEvent));
    }
    catch(ex){
      console.log('ERROR adding trip event', ex);
    }
  }
}

// removeTripEvent removes an event from a trip
export const removeTripEvent = (eventId) => {
  return async (dispatch) => { 
    try{
      const { data: deleted } = await axios.delete('/api/tripevents', {data: { eventId: eventId}});
      dispatch(_removeTripEvent(deleted));
    }
    catch(ex){
      console.log('ERROR deleting trip event', ex);
    }
  }
}

// changeTripEvent changes an existing event on a trip
export const updateTripEvent = (event) => {
  return async (dispatch) => { 
    try{
      const { data: updatedEvent } = await axios.put('/api/tripevents', event);
      dispatch(_updateTripEvent(updatedEvent));
    }
    catch(ex){
      console.log('ERROR updating trip event', ex);
    }
  }
}


// * REDUCER

export default function(state = {trip: {}, userCreatedTrips: [], userInvitedTrips: []}, action) {

  switch (action.type) {
    case ADD_TRIP_EVENT:
      return {...state, trip: action.trip}
    case REMOVE_TRIP_EVENT:
      return {...state, trip: action.trip}
    case UPDATE_TRIP_EVENT:
      return {...state, trip: action.trip}
    default:
      return state
  }
}
