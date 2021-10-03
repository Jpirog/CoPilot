import React, { useState, useEffect, isValidElement } from "react";
import dateFormat from "dateformat";
import StarRatings from "react-star-ratings";
import { useSelector, useDispatch } from "react-redux";
import { tripVote, removeTripEvent, updateTripEvents } from '../store/trips';
import { useHistory, Link, Redirect } from 'react-router-dom';
import toast from 'react-hot-toast';

const notify = (msg) => toast.success(msg, { duration: 4000, position: 'top-center' })

const FinalizeTrip = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [myEvents, setMyEvents] = useState([]);
  const tripEvents = useSelector((state) => state.trips.trip.tripevents);
  const thisTrip = useSelector((state) => state.trips.trip);
  const tripId = useSelector((state) => state.trips.trip.id);

  const getDups = (arr) => {
    // 1) copy and sort the array
    // 2) reduce the sorted array to an object with counts of events per unique date/time/purpose
    // 3) filter the sorted array to include those with counts > 1
    // 4) return the filtered, sorted array
    const sortedArr = [...arr].sort((a,b) => {
      const aKey = dateFormat(a.startDate,'yyyymmdd').concat(a.purpose);
      const bKey = dateFormat(b.startDate,'yyyymmdd').concat(b.purpose);
      if (aKey < bKey) return -1;
      if (aKey === bKey) return 0;
      return 1;
    })
    //console.log('sorted', sortedArr);
    const keyCounts = sortedArr.reduce((accum, c) => {
      const thisKey = dateFormat(c.startDate,'yyyymmdd').concat(c.purpose);
      accum[thisKey] = accum[thisKey] ? accum[thisKey] + 1 : 1;
      return accum;
    }, {})
    //console.log('--- counts', keyCounts);
    return sortedArr.filter(c => {
      const thisKey = dateFormat(c.startDate,'yyyymmdd').concat(c.purpose);
      return keyCounts[thisKey] > 1 ? true : false;
    })
  }  

  useEffect(() => {
    if (tripEvents){
      setMyEvents(getDups(tripEvents));
    }
  },[tripEvents])
  
  const handleVoteClick = async (ev) => {
    await tripVote(tripId, true, 'IN PROGRESS');
    notify(`Voting is now open for your trip to ${thisTrip.destination} - check back later for the results`);
    history.push('/itinerary')
  }
  
  const handleFinalizeClick = async (ev) => {
    await tripVote(tripId, false, 'FINALIZED');
    await updateTripEvents(tripId);
    notify(`Your trip to ${thisTrip.destination} is now finalized!`);
    history.push('/itinerary')
  }

  if (typeof tripEvents === 'undefined') return null;

  if (thisTrip && thisTrip.status === 'FINALIZED'){ 
    return (
      <div id="content-wrapper-double">
      <h3 style={{marginTop: "50px", textAlign: "center", color: "white"}}>This trip was already finalized</h3>
      <h4 style={{marginTop: "10px", textAlign: "center", color: "white"}}>Click <Link to="/itinerary">here</Link> to see the final itinerary</h4>

      </div>
    )};
  
  return (
    <div id="content-wrapper-double">
      <div style={{textAlign:'center'}}>
        <h2 style={{color: "white"}}>Finalize your trip</h2>
        <h2 style={{color: "white"}}>There are three steps to finalizing a trip:</h2>
      </div>
      <div className="final-boxes">
        <div className="final-nbr">1</div>
        <div className="final-text">Open voting so CoPilots can vote on their preferred activities. Come back later for step 2.</div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-primary finbtn1" onClick={handleVoteClick}  disabled={(myEvents && myEvents.length) === 0 || thisTrip.voteOpened}>Open voting</button>
            <span style={{fontSize: '22px', color:"white"}}>{thisTrip.voteOpened ? " -- Voting is in progress" : myEvents && myEvents.length === 0 ? " -- No conflicting events - no need for a vote" : "" }</span>
          </div>
        </div>
      </div>
      <div className="final-boxes">
        <div className="final-nbr">2</div>
        <div className="final-text">Review voting results below and possibly delete conflicting proposed events</div>
      </div>
      <div className="d-lg-flex flex-column align-content-center flex-wrap mr-md-6" id="tripattendtbl">
        {myEvents && myEvents.length === 0 && 
        <h2 style={{marginTop:'20px'}}>Congratulations! There are no duplicate events on your trip.</h2>}
          {myEvents && myEvents.length > 0 &&
        <table style={{marginTop:'20px'}} className="table table-hover shadow p-3 mb-5 bg-white rounded">
          <thead>
            <tr key={'A'} style={{backgroundColor:"blue", color: 'white'}}>
              <th scope="col">Date</th>
              <th scope="col">Purpose</th>
              <th scope="col">Description</th> 
              <th scope="col">Venue</th>
              <th scope="col">Rating</th>
              <th scope="col">Cost</th>
              <th scope="col">Votes</th> 
              <th scope="col">Delete?</th>
            </tr>
          </thead>

          <tbody>
            <tr key={'B'}>
              <td style={{textAlign:"center"}} colSpan={8}><strong>There are multiple suggestions for the same purpose on some days of the trip</strong></td>
            </tr>
            <tr key={'C'}>
              <td style={{textAlign:"center"}} colSpan={8}><strong>Please review the events and voting and delete some (if desired)</strong></td>
            </tr>
            {
              myEvents.map(event => {
                return (
                  <tr key={event.id}>
                    <td scope="row">{dateFormat(event.startDate,"ddd, mmm d, yyyy")}</td>
                    <td scope="row">{event.purpose}</td>
                    <td>{event.description}</td> 
                    <td><a href={event.url} target="_blank" rel="noreferrer">{event.placeName}</a></td> 
                    <td>
                      <StarRatings
                        rating={event.rating ? event.rating : 0}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="0px"
                      />
                      </td> 
                      <td>{event.priceLevel}</td> 
                      <td>{event.votes}</td> 
                      <td><button type="button" className="btn btn-outline-danger" 
                            onClick={()=>{ dispatch(removeTripEvent(tripId,event.id) )
                        }}><i className="far fa-trash-alt"></i></button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>}
      </div>
      <div className="final-boxes">
        <div className="final-nbr">3</div>
        <div className="final-text">Finalize the trip - this will change events from 'Proposed' to 'Finalized'</div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-primary finbtn2" onClick={ handleFinalizeClick }>Finalize trip!</button>
          </div>
        </div>
      </div>
    </div>
    );
  };

export default FinalizeTrip;
