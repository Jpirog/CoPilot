import axios from 'axios';

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

// addUpdateTrip adds a new trip or updates an existing one and returns the row
export const addUpdateTrip = (trip) => {
  return async (dispatch) => { 
    try{
      const { data: newTrip } = await axios.post('/api/trips', trip);
      dispatch(_getTripDetails(newTrip)); 
      dispatch(getUserCreatedTrips(newTrip.ownerId)); // reload this since there is a new/changed trip
    }
    catch(ex){
      console.log('ERROR adding/updating trip', ex);
    }
  }
}

// addTripEvent adds an event to a trip
export const addTripEvent = (event) => {
  return async (dispatch) => { 
    try{
      const { data: newEvent } = await axios.post('/api/tripevents', event);
      dispatch(getTripDetails(newEvent.tripId));
    }
    catch(ex){
      console.log('ERROR adding trip event', ex);
    }
  }
}

// removeTripEvent removes an event from a trip
export const removeTripEvent = (tripId, eventId) => {
  return async (dispatch) => { 
    try{
      await axios.delete('/api/tripevents', {data: { eventId: eventId}});
      dispatch(getTripDetails(tripId));
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
      const { data: updatedEvent } = await axios.post('/api/tripevents', event);
      dispatch(getTripDetails(updatedEvent.tripId));
    }
    catch(ex){
      console.log('ERROR updating trip event', ex);
    }
  }
}

// addTripAttendee adds an attendee to a trip
export const addTripAttendee = (attendee) => {
  return async (dispatch) => { 
    try{
      const { data: newAttendee } = await axios.post('/api/tripattendees', attendee);
      dispatch(getTripDetails(newAttendee.tripId));
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
      await axios.delete('/api/tripattendees', {data: { tripId: tripId, email: email}});
      dispatch(getTripDetails(tripId));
    }
    catch(ex){
      console.log('ERROR deleting trip attendee', ex);
    }
  }
}

// updateTripAttendee changes an existing attendee on a trip
export const updateTripAttendee = (attendee) => {
  return async (dispatch) => { 
    try{
      const { data: updatedAttendee } = await axios.put('/api/tripattendees', attendee);
        dispatch(getTripDetails(attendee.tripId));
    }
    catch(ex){
      console.log('ERROR updating trip attendee', ex);
    }
  }
}

// getTripsNeedingResponse returns the trips a user is invited to but hasn't responded to
export const getTripsNeedingResponse = async (userId) => {
  try{
    const { data: trips } = await axios.get(`/api/tripattendees/needresponse/${userId}`);
    return trips;
  }
  catch(ex){
    console.log('ERROR getting user invited trips needing response', ex);
  }
}

// updateTripResponse updates the trip attendee table with a users accept or decline
export const updateTripResponse = async (tripId, userId, response) => {
  try{
    const { data: trips } = await axios.put('/api/tripattendees/response/', { tripId, userId, response });
    return trips;
  }
  catch(ex){
    console.log('ERROR updating user response', ex);
  }
}

// updateTripResponse updates the trip attendee table with a users accept or decline
export const updateInvitedTripsWithId = async (username, userId) => {
  try{
    const resp = await axios.put('/api/tripattendees/updateid/', { username, userId });
  }
  catch(ex){
    console.log('ERROR updating user response', ex);
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
