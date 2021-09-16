import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getUser, updateUser } from "../store/user";
import { removeTripAttendee } from "../store/trips";
// import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import { me } from '../store';
import dateFormat from 'dateformat';

const notify = (msg) => toast.success(msg, { duration: 3000, position: 'top-center' })

const TripAttendees = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const tripDetails = useSelector((state) => state.trips.trip);
  // const [dispName, setDispName] = useState("");
  // const [username, setusername] = useState("");
  // const [name, setname] = useState("");
  // const [user, setUser] = useState({});
  // const [enableSave, setenableSave] = useState(false);

  // useEffect( () => {
  //   const fetchData = async () => {
  //     const userData = await getUser(userId);
  //     setusername(userData.username);
  //     setname(userData.name);
  //     setUser(userData);
  //     setDispName(userData.name);
  //   }
  //   fetchData();
  // },[] );
  
  // const handleSubmit = (ev) => {
  //   ev.preventDefault();
  //   const newUser = user;
  //   newUser.name = name;
  //   updateUser(newUser);
  //   dispatch(me());
  //   notify();
  //   history.push('/home');
  // }
  if (!tripDetails.destination){
    return null;
  }
  const handleUninvite = (ev, tripId, email) => {
    ev.preventDefault();
    if (confirm(`Please confirm ${email} should be removed from the invite list`)){
      dispatch(removeTripAttendee(tripId, email));
      notify(`${email} has been removed from the invite list`);
    }
  }

  return (
      <div id="content-wrapper">
        <Toaster />
        <div>
          <h2>Trip Attendees</h2>
          <h3>Who should be included in this trip?</h3>
        </div>
        <h4>{ tripDetails.destination }</h4>
        <h4>({ dateFormat(tripDetails.startDate, "ddd, mmm d, yyyy") } - { dateFormat(tripDetails.endDate, "ddd, mmm d, yyyy") })</h4>
        <div>
          <form id="newattendeeform" onSubmit={console.log('submitted')}>
            <label htmlFor="newattendee">Enter email of invitee:&nbsp;</label>
            <input name="newattendee" autoFocus type="email" />
            <button type="submit">Invite to trip</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Status</th>
                <th>Response Date</th>
                <th>Remove?</th>
              </tr>
            </thead>
            <tbody>
              {tripDetails.tripattendees.map(attendee => {
                const accepted = attendee.responseDate ? attendee.accepted ? 'Accepted' : 'Declined' : 'No response yet';
                const respDate = attendee.responseDate ? dateFormat(attendee.responseDate, "mmm d, yyyy") : 'No response yet';
                const name = attendee.user ? attendee.user.name : 'Unknown';
                return (<tr key={ attendee.id }>
                  <td>{ attendee.email }</td>
                  <td>{ name }</td>
                  <td>{ accepted }</td>
                  <td>{ respDate }</td>
                  <td><button onClick={(ev) => handleUninvite(ev, attendee.id, attendee.email) }>Uninvite/remove</button></td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default TripAttendees;
