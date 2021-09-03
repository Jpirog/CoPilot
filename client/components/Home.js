import React, { useEffect , useState } from 'react';
import { getTripDetails, getUserCreatedTrips, getUserInvitedTrips } from '../store/trips';
import { useDispatch, useSelector } from "react-redux";

export const Home = props => {
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
      const data = await dispatch(getUserInvitedTrips(5));
      setUserInvitedTrips(data);
    }
    fetchData();
  },[] )

  const tripDetails = useSelector((state) => state.trips.trip);
  const userCreatedTripDetails = useSelector((state) => state.trips.userCreatedTrips);
  const userInvitedTripDetails = useSelector((state) => state.trips.userInvitedTrips);

  if (!Array.isArray(userCreatedTripDetails)) return '';
  if (!Array.isArray(userInvitedTripDetails)) return '';

  return (
    <div>
      <h3>Welcome, {username}</h3>
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
    </div>
  )
};


// const mapState = state => {
//   return {
//     username: state.auth.username,
//     trip: state.trip
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getTripDetails: (tripId) => getTripDetails(tripId),
//   }
// }

//export default connect(mapState, mapDispatch)(Home)
export default Home;
