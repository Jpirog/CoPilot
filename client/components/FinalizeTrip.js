import React, { useState, useEffect, isValidElement } from "react";
import dateFormat from "dateformat";
import StarRatings from "react-star-ratings";
import { useSelector, useDispatch } from "react-redux";
// import { getUser, updateUser } from "../store/user";
// import { useHistory } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { me } from '../store';

//const notify = () => toast.success('Your profile has been updated', { duration: 3000, position: 'top-center' })

const FinalizeTrip = () => {
  const [myEvents, setMyEvents] = useState([]);
  const tripEvents = useSelector((state) => state.trips.trip.tripevents);

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
      if (keyCounts[thisKey] > 1) return true;
      return false;
    })
  }  

  useEffect(() => {
    if (tripEvents){
      setMyEvents(getDups(tripEvents));
    }
  },[tripEvents])
  
  // const handleSubmit = (ev) => {
  //   ev.preventDefault();
  //   const newUser = user;
  //   newUser.name = name;
  //   updateUser(newUser);
  //   dispatch(me());
  //   notify();
  //   history.push('/home');
  // }

  // if (name === ''){
  //   return null;
  // }

  if (typeof tripEvents === 'undefined') return null;
  console.log('===',myEvents);
  return (
      <div id="content-wrapper">
        <div className="d-lg-flex flex-column align-content-center flex-wrap mr-md-6">
          <table className="table table-hover shadow p-3 mb-5 bg-white rounded">
            <thead>
              <tr>
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
              <tr>
                <td style={{textAlign:"center"}} colSpan={8}><strong>Multiple suggestions for the same event on 09/30/2021</strong></td>
              </tr>
              {
                myEvents.map(event => {
                  return (
                    <tr>
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
                        <td><button type="button" className="btn btn-outline-danger" onClick={()=>{
                  //dispatch(removeTripEvent(tripId,event.id))
                  }}><i className="far fa-trash-alt"></i></button></td>
                      </tr>
                    )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default FinalizeTrip;
