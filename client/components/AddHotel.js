/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTripDetails, addTripEvent, removeTripEvent } from "../store/trips";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddHotel = (props) => {
  const tripId = props.match.params.tripId;
  const { trip, tripevents } = useSelector((state) => ({
    trip: state.trips.trip,
    tripevents: state.trips.trip.tripevents,
  }));

  const [hotelList, setHotelList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get("/api/yelp/hotel", {
      params: { term: searchValue },
    });
    setHotelList(data);
  };

  useEffect(() => {
    dispatch(getTripDetails(tripId));
  }, []);

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get("/api/yelp/hotel");
      setHotelList(data);
    };
    func();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      {/* <button type="button" onClick={()=>{}}>Add A Hotel</button> */}

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
              event.purpose === "SLEEP" ? (
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
              ) : (
                ""
              )
            )}{" "}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="search for your hotel"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        ></input>
        <button type="submit">search</button>
        <button
          type="button"
          onClick={() => {
            setSearchValue("");
          }}
        >
          clear search
        </button>
      </form>

      <Link to="/activity">Go to Next:</Link>

      {hotelList.map((hotel) => (
        <ul
          key={hotel.id}
          style={{ flex: 1, flexDirection: "row", padding: "20px" }}
        >
          <a href={hotel.url}>
            <img
              style={{ width: "20%", height: "20%" }}
              src={hotel.image_url}
            ></img>
          </a>
          <li>{hotel.name}</li>
          <li>{hotel.rating}</li>
          <li>{hotel.price}</li>

          {trip.id && (
            <DatePicker
              selected={startDate}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              placeholderText="select a day"
              openToDate={new Date(trip.startDate)}
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
              console.log(dateRange);
              if (dateRange[0]) {
                dispatch(
                  addTripEvent({
                    purpose: "SLEEP",
                    startDate,
                    endDate,
                    tripId,
                    description: `{hotel: ${hotel.name}, website:${hotel.url}}`,
                  })
                );
              } else {
                alert("please select your dateRange");
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

export default AddHotel;
