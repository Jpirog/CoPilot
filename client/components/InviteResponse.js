import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTripsNeedingResponse, getTripDetails  } from "../store/trips";
import { updateTripResponse  } from "../store/trips";
import { useHistory, Redirect } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import dateFormat from 'dateformat';

const notify = (msg) => toast.success(msg, { duration: 3000, position: 'top-center' })

const InviteResponse = props => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id);
  const dispName = useSelector((state) => state.auth.name);

  const [trips, setTrips] = useState();

  useEffect( () => {
    const fetchData = async () => {
      const trips = await getTripsNeedingResponse(userId);
      setTrips(trips);
    };
    if (userId){
      fetchData();
    }
  },[userId] );

  const recordResponse = async (tripId, userId, response) => {
    await updateTripResponse(tripId, userId, response);
    response ? notify(`Thank you for responding. We're looking forward to your participation!`) : 
               notify(`Thank you. We're sorry you cannot participate.`)
    notify();
    const newTrips = trips.filter( trip => trip.id === tripId ? false : true);
    if (newTrips.length === 0){
      dispatch(getTripDetails(tripId))
      history.push('/home');
    } else {
      dispatch(getTripDetails(tripId))
      setTrips(newTrips);
    }
  }

  if (!Array.isArray(trips)){
    return null;
  }

  if (trips.length === 0){
    history.push('/home');
  }

  return (
    <div id="content-wrapper">
      <Toaster />
        <div id="fb-root"></div>
          <div id="profilecontainer">
            <div className="containerx" id="profileleft">
              <h1 className="profilehdr">Respond to invitations!</h1>
            </div>
            <div className="containerx" id="profileright">
            <div id="profileform">
                <h2>{ dispName }</h2>
                <hr />
                <p>You've been invited to CoPilot! Please respond to the invitation(s) below:</p>
                <hr />
                { trips.map(trip => {
                    const fromDate = dateFormat(trip.fromDate, "ddd, mmm d, yyyy");
                    const toDate = dateFormat(trip.toDate, "ddd, mmm d, yyyy");
                    return (
                      <div key={trip.id}>
                        <p>&nbsp;</p>
                        <p >{ trip.owner.name } has invited you on a trip to {trip.destination}.
                        The trip starts on { fromDate } and goes through { toDate }. The purpose is: { trip.purpose }!
                        </p><br />
                        <button onClick={()=> recordResponse(trip.id, userId, true)}>Accept</button> &nbsp; 
                        <button onClick={()=> recordResponse(trip.id, userId, false)}>Decline</button> &nbsp; 
                        <p>&nbsp;</p>
                        <hr />
                      </div>
                    )
                })}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default InviteResponse;
