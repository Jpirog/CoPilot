import React, { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import { getTripDetails } from '../store/trips';
import { useDispatch, useSelector } from "react-redux";


export const Home = props => {
  const username = useSelector((state) => state.auth.username)
  const dispatch = useDispatch();
  const [trip, setTrip] = useState({});

  useEffect( () => {
    const fetchData = async () => {
      const data = await dispatch(getTripDetails(1));
      setTrip(data);
    }
    fetchData();
  },[] );

  const tripDetails = useSelector((state) => state.trips);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <p>Your trip details:</p>
      <p>Location: {tripDetails.destination}</p>
      <p>Purpose: {tripDetails.purpose}</p>
      <p>Status: {tripDetails.status}</p>
      <p>Breakfast: {tripDetails.breakfast ? 'Yes' : 'No'}</p>
      <p>Lunch: {tripDetails.lunch ? 'Yes' : 'No'}</p>
      <p>Dinner: {tripDetails.dinner ? 'Yes' : 'No'}</p>
      <p>Start date: {tripDetails.startDate}</p>
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
