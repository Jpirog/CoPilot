import axios from 'axios';
import store from './index';

//* ACTION TYPES

const GET_TRIP_DETAILS = 'GET_TRIP_DETAILS';
const GET_USER_CREATED_TRIPS = 'GET_USER_CREATED_TRIPS';
const GET_USER_INVITED_TRIPS = 'GET_USER_INVITED_TRIPS';

// * ACTION CREATORS

const _getTripDetails = trip => {
  return {
    type: GET_TRIP_DETAILS, 
    trip,
  }
};

const _getUserCreatedTrips = userCreatedTrips => {
  return {
    type: GET_USER_CREATED_TRIPS, 
    userCreatedTrips,
  }
};

const _getUserInvitedTrips = userInvitedTrips => {
  return {
    type: GET_USER_INVITED_TRIPS, 
    userInvitedTrips,
  }
};

// * THUNK CREATORS

// getTripDetails returns owner information, all invitees, events, and event invitees for a trip
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

// getUserCreatedTrips returns the trips created by a user
export const getUserCreatedTrips = (userId) => {
  return async (dispatch) => { 
    try{
      const { data: userCreatedTrips } = await axios.get(`/api/trips/usercreated/${userId}`);
      dispatch(_getUserCreatedTrips(userCreatedTrips));
    }
    catch(ex){
      console.log('ERROR getting user created trips', ex);
    }
  }
}

// getUserInvitedTrips returns the trips a user is invited to
export const getUserInvitedTrips = (userId) => {
  return async (dispatch) => { 
    try{
      const { data: userInvitedTrips } = await axios.get(`/api/trips/userinvited/${userId}`);
      dispatch(_getUserInvitedTrips(userInvitedTrips));
    }
    catch(ex){
      console.log('ERROR getting user invited trips', ex);
    }
  }
}

// * REDUCER

export default function(state = {trip: {}, userCreatedTrips: [], userInvitedTrips: []}, action) {

  switch (action.type) {
    case GET_TRIP_DETAILS:
      return {...state, trip: action.trip}
    case GET_USER_CREATED_TRIPS:
      return {...state, userCreatedTrips: action.userCreatedTrips}
    case GET_USER_INVITED_TRIPS:
      return {...state, userInvitedTrips: action.userInvitedTrips}
    default:
      return state
  }
}
