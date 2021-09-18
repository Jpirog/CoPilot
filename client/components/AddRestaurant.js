/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTripDetails, addTripEvent, removeTripEvent } from "../store/trips";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddRestaurant = (props) => {
  const { tripId, tripevents, trip } = useSelector((state) => ({
    trip: state.trips.trip,
    tripId: state.trips.trip.id,
    tripevents: state.trips.trip.tripevents,
  }));

  console.log(trip)

  const [restaurantList, setRestaurantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [location, setLocation] = useState('');

  const dispatch = useDispatch();

  function availableDates() {
    let activeDays = [];
    let amountActDays =
      new Date(trip.endDate).getDate() - new Date(trip.startDate).getDate();
    for (let i = 0; i <= amountActDays; i++) {
      activeDays.push(
        new Date(
          new Date(trip.startDate).setDate(
            new Date(trip.startDate).getDate() + i
          )
        )
      );
    }
    return activeDays;
  }

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get("/api/yelp/restaurants", {
        params: { location }
      });
      setRestaurantList(data);
    };
    func();
  }, [location]);

  useEffect(() => {
    setLocation(trip.destination);
  }, [trip]);

  function restaurantSearchFieldChange(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  function restaurantSearchSubmit(e) {
    e.preventDefault();
    const func = async () => {
      const { data } = await axios.get("/api/yelp/restaurants", {
        params: { term: searchValue, location },
      });
      setRestaurantList(data);
    };
    func();
  }

  return (
    <div id='content-wrapper' style={{ padding: "80px" }}>
      <table border="2px">
        <tbody>
          <tr>
            <th>Start Date</th>
            <th>Restaurant Name</th>
            <th>Event description</th>
            <th>Restaurant Website</th>
            <th>Restaurant Location </th>
            <th>delete</th>
          </tr>
          {tripevents &&
            tripevents.map((event) =>
              event.purpose === "LUNCH" ? (
                <tr key={event.id}>
                  <td>{event.startDate}</td>
                  <td>{event.placeName}</td>
                  <td>{event.description}</td>
                  <td>
                    <a href={event.url}>
                      Link of Website
                    </a>
                  </td>
                  <td>{event.location}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(removeTripEvent(tripId, event.id));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>

      <form onSubmit={restaurantSearchSubmit}>
        <input
          placeholder="search for your restaurant"
          type="text"
          value={searchValue}
          onChange={restaurantSearchFieldChange}
        />
        <input type="submit" value="Search a restaurant" />
      </form>

      <Link to={`/hotel`}>Go next to hotels:</Link>

      <form>
        <label>Change location:</label>
        <input
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></input>
      </form>

      {restaurantList.map((restaurant) => (
        <ul
          key={restaurant.id}
          style={{ flex: 1, flexDirection: "row", padding: "20px" }}
        >
           <a href={restaurant.url}>
            <img
              style={{ width: "20%", height: "20%" }}
              src={restaurant.image_url}
            ></img>
          </a>
          <li>{restaurant.name}</li>
          <li>{restaurant.rating}</li>
          <li>{restaurant.price}</li>

          <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              isClearable
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, h:mm aa yyyy"
              timeIntervals={30}
              placeholderText="Select a date"
              timeCaption="Time"
              openToDate={new Date(trip.startDate)}
              includeDates={availableDates()}
              dayClassName={(date) => {
                return date >= new Date(trip.startDate) &&
                  date <= new Date(trip.endDate)
                  ? "highlighted"
                  : undefined;
              }}
              withPortal
          />

          <button
            onClick={() => {
              if (startDate) {
                dispatch(
                  addTripEvent({
                    purpose: "LUNCH",
                    startDate,
                    tripId,
                    description: 'Try european food',
                    placeName: restaurant.name,
                    url: restaurant.url,
                    location: restaurant.location.display_address.join(''),
                  })
                );
              } else {
                alert("please select your startDate");
              }
            }}
          >
            Add to trip
          </button>
        </ul>
      ))}
    </div>
  );
};

export default AddRestaurant;
