import React, { useEffect , useState } from 'react';
import { getTripDetails, getUserCreatedTrips, getUserInvitedTrips, 
         addUpdateTrip, addTripEvent, removeTripEvent, 
         addTripAttendee, removeTripAttendee } from '../store/trips';
import { useDispatch, useSelector } from "react-redux";

export const SampleCode = props => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username)

  const [trip, setTrip] = useState({});
  const [userCreatedTrips, setUserCreatedTrips] = useState([]);
  const [userInvitedTrips, setUserInvitedTrips] = useState([]);


  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(getTripDetails(1));
      setTrip(data);
    }
    fetchData();
  },[] );

  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(getUserCreatedTrips(1));
      setUserCreatedTrips(data);
    }
    fetchData();
  },[] )

  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(getUserInvitedTrips(3));
      setUserInvitedTrips(data);
    }
    fetchData();
  },[] )

  const id = `abc${Math.ceil(Math.random() * 1000000)}@abc.com`
  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(addTripAttendee({email: id,tripId: 1}));
    }
    fetchData();
  },[] )

  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(addTripEvent({purpose: 'OTHER', description: 'dinner the last evening',
        startDate: '2021-09-07', endDate: '2021-09-08', status: 'PROPOSED', tripId: 1,
        }));
    }
    fetchData();
  },[] )

  const addTrip = async (id) => {
    const newTrip = await dispatch(addUpdateTrip({destination: 'Hollywood', purpose: 'RELAX', status: 'IN PROGRESS', ownerId: id}))
  }

  const updateTrip = async (id) => {
    const updatedTrip = await dispatch(addUpdateTrip({destination: 'Bollywood', purpose: 'RELAX', status: 'IN PROGRESS', ownerId: id, id: 2}))
  }

  const removeAttendee = async (tripId,email) => {
    await dispatch(removeTripAttendee(1, 'abc957113@abc.com')); // change these for the parms
  }

  const removeTripEventHere = async (id) => {
    await dispatch(removeTripEvent(1,9)); // change these for the parms (trip id, event id)
  }

  const tripDetails = useSelector((state) => state.trips.trip);
  const userCreatedTripDetails = useSelector((state) => state.trips.userCreatedTrips);
  const userInvitedTripDetails = useSelector((state) => state.trips.userInvitedTrips);
  //const tripAttendeeList = useSelector((state) => state.tripattendees.data);

  if (!Array.isArray(userCreatedTripDetails)) return '';
  if (!Array.isArray(userInvitedTripDetails)) return '';

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <button onClick={() => addTrip(2)}>Add trip</button>
      <hr />
      <p>use of getTripDetails thunk (pass in a trip ID): </p>
      <p>getTripDetails returns owner information, all invitees, events, and event invitees for a trip</p>
      <p>Location: {tripDetails.destination}</p>
      <p>Purpose: {tripDetails.purpose}</p>
      <p>Status: {tripDetails.status}</p>
      <p>Breakfast: {tripDetails.breakfast ? 'Yes' : 'No'}</p>
      <p>Lunch: {tripDetails.lunch ? 'Yes' : 'No'}</p>
      <p>Dinner: {tripDetails.dinner ? 'Yes' : 'No'}</p>
      <p>Start date: {tripDetails.startDate}</p>
      <hr />
      <p>use of getUserCreatedTrips thunk (pass in a user id)</p>
      <p>getUserCreatedTrips returns the trips a user has created</p>
      { userCreatedTripDetails.map(c => <p>{c.id} / {c.destination}</p>) } 
      <hr />
      <p>use of getUserInvitedTrips thunk (pass in a user id)</p>
      <p>getUserInvitedTrips returns the trips a user is invited to (not the owner)</p>
      { userInvitedTripDetails.map(c => <p>{c.id} / {c.destination}</p>) } 
      <hr />
      <p>use of addUpdateTrip thunk (pass in a trip object - if no id, it creates, else it updates)</p>
      <p>addUpdateTrip returns the updated/new trip in state</p>
      <p>{ tripDetails.destination  } </p>
      <hr />
      <button onClick={() => removeAttendee()}>Remove the trip attendee</button>
      <hr />
      <button onClick={() => removeTripEventHere()}>Remove the trip event</button>
      <hr />
      <button onClick={() => updateTrip()}>Update trip #2</button>

      </div>
  )
};

export default SampleCode;
