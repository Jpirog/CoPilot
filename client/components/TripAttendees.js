import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTripAttendee, addTripAttendee } from "../store/trips";
import { getUserByEmail } from '../store/user';
import toast, { Toaster } from 'react-hot-toast';
import dateFormat from 'dateformat';
import { sendEmail } from '../utils/sendmail';

const notify = (msg) => toast.success(msg, { duration: 3000, position: 'top-center' })

const TripAttendees = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const tripDetails = useSelector((state) => state.trips.trip);
  const [errMsg, setErrMsg] = useState('');

  const handleAddClick = async (ev) => {
    ev.preventDefault();
    const email = ev.target.newattendee.value.toLowerCase().trim();
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setErrMsg('This email address is not valid')
      return (true)
    }

    if (tripDetails.tripattendees.find(c => c.email === email)){
      setErrMsg('This email is already on the invite list')
      return;
    }
    
    setErrMsg('');
    
    const userData = await getUserByEmail(email); // check if the user exists in the system
    const recData = {
      accepted: false,
      responseDate: null,
      tripId: tripDetails.id,
      userId: userData.length ? userData[0].id : null,
      email: email,
    }
    dispatch(addTripAttendee(recData));

    sendEmail (email, 'You are invited on my trip!', { type: 'invited',
      dest: tripDetails.destination,
      host: `${tripDetails.owner.name} (${tripDetails.owner.username})`,
      fromDate: dateFormat(tripDetails.startDate, "ddd, mmm d, yyyy") ,
      toDate: dateFormat(tripDetails.endDate, "ddd, mmm d, yyyy") ,
    }) ;

    notify(`${email} added to the list and an email invite was sent`);

  }

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
      <div id="attendeesheadings">
        <Toaster />
        <div>
          <h2>Trip Attendees</h2>
          <h3>Who should be included in this trip?</h3>
        </div>
        <h4>{ tripDetails.destination }</h4>
        <h4>({ dateFormat(tripDetails.startDate, "ddd, mmm d, yyyy") } - { dateFormat(tripDetails.endDate, "ddd, mmm d, yyyy") })</h4>
        <div>
          <form id="newattendeeform" onSubmit={ handleAddClick }>
            <label htmlFor="newattendee">Enter email of invitee:&nbsp;</label>
            <input name="newattendee" autoFocus type="email" />&nbsp;
            <button type="submit">Invite to trip</button>
          </form>
          <h4>{ errMsg }</h4>
          </div>
          <h3>--- Existing invitees ---</h3>
          <table id="attendees">
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
                  <td><button onClick={(ev) => handleUninvite(ev, tripDetails.id, attendee.email) }>Uninvite/remove</button></td>
                </tr>
                )
              })}
            </tbody>
            {
              tripDetails.tripattendees.length > 0 ? null :
                <tfoot>
                  <tr>
                    <td colSpan={5}>No attendees yet, add some above!</td>
                  </tr>
                </tfoot>
            }
            </table>
        </div>
      </div>
    );
  };

export default TripAttendees;
