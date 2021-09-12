/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTripDetails, addTripEvent, removeTripEvent } from "../store/trips";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddRestaurant = (props) => {
  const tripId = props.match.params.tripId;

  const { trip, tripevents } = useSelector((state) => ({
    trip: state.trips.trip,
    tripevents: state.trips.trip.tripevents,
  }));

  const [restaurantList, setRestaurantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [startDate, setStartDate] = useState(new Date());

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
      const { data } = await axios.get("/api/yelp/restaurants");
      setRestaurantList(data);
    };
    func();
  }, []);

  useEffect(() => {
    dispatch(getTripDetails(tripId));
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const func = async () => {
      const { data } = await axios.get("/api/yelp/restaurants", {
        params: { term: searchValue },
      });
      setRestaurantList(data);
    };

    func();
  }

  return (
    <div style={{ padding: "20px" }}>
      <table border="2px">
        <tbody>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>delete</th>
          </tr>
          {tripevents &&
            tripevents.map((event) =>
              event.purpose === "MEAL" ? (
                <tr key={event.id}>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>
                  <td>{event.description}</td>
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
              ) : ("")
            )}
          {""}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="search for your restaurant"
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <input type="submit" value="Search a restaurant" />
      </form>

      <Link to="/hotel">Go to Next:</Link>

      {restaurantList.map((restaurant) => (
        <ul
          key={restaurant.id}
          style={{ flex: 1, flexDirection: "row", padding: "20px" }}
        >
          <img
            style={{ width: "20%", height: "20%" }}
            src={restaurant.image_url}
          ></img>
          <li>{restaurant.name}</li>
          <li>{restaurant.rating}</li>
          <li>{restaurant.price}</li>

          {trip.id && (
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
          )}
          <button
            onClick={() => {
              console.log(startDate)
              if (startDate) {
                dispatch(
                  addTripEvent({
                    purpose: "LUNCH",
                    startDate,
                    tripId,
                    description: `${restaurant.name}, website: ${restaurant.url}`,
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
