import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTripEvent, removeTripEvent } from "../store/trips";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoogleMap from "./googleMap";

const AddHotel = (props) => {
  const { trip, tripId, tripevents } = useSelector((state) => ({
    trip: state.trips.trip,
    tripId: state.trips.trip.id,
    tripevents: state.trips.trip.tripevents,
  }));
  const [hotelList, setHotelList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hotelEvents, setHotelEvents] = useState([]);
  const [location, setLocation] = useState("");

  //dispatch thunk
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get("/api/yelp/hotel", {
      params: { term: searchValue, location },
    });
    setHotelList(data);
  };

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get("/api/yelp/hotel", {
        params: { location },
      });
      setHotelList(data);
    };
    func();
  }, [location]);

  useEffect(() => {
    let list =
      tripevents && tripevents.filter((event) => event.purpose === "SLEEP");
    setHotelEvents(list);
  }, [tripevents]);

  useEffect(() => {
    setLocation(trip.destination);
  }, [trip]);

  return (
    <div style={{ padding: "80px" }}>
      <table border="2px">
        <tbody>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Hotel Name</th>
            <th>Hotel Website</th>
            <th>Hotel Location </th>
            <th>delete</th>
          </tr>
          {tripevents &&
            tripevents.map((event) =>
              event.purpose === "SLEEP" ? (
                <tr key={event.id}>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>
                  <td>{event.placeName}</td>
                  <td>
                    <a href={event.url}>Link of Website</a>
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
      <br />

      <Link to={`/activity`}>
        <button>Go to Activity:</button>
      </Link>
      <br />
      <label>Change location</label>
      <input
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      ></input>

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

      <div className="flexBox">
        {hotelList.map((hotel) => (
          <ul
            className="item"
            key={hotel.id}
            style={{ padding: "2%", width: "33%", listStyleType: "none" }}
          >
            <a href={hotel.url}>
              <img
                style={{ width: "60%", height: "60%" }}
                src={hotel.image_url}
              ></img>
            </a>
            <li>{hotel.name}</li>
            <li>{hotel.rating}</li>
            <li>{hotel.price}</li>
            <li>
              <input
                placeholder="add event description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
            </li>
            <>
              <DatePicker
                placeholderText="select a CheckIn DateTime"
                timeInputLabel="Pick a Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                withPortal
              />
              <DatePicker
                placeholderText="select a CheckOut DateTime"
                timeInputLabel="Pick a Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                withPortal
              />
            </>

            <button
              onClick={() => {
                if (startDate && endDate) {
                  dispatch(
                    addTripEvent({
                      purpose: "SLEEP",
                      startDate,
                      endDate,
                      tripId,
                      description,
                      placeName: hotel.name,
                      url: hotel.url,
                      location: hotel.location.display_address.join(""),
                      yelpId: hotel.id,
                      rating: hotel.rating,
                      priceLevel: hotel.price,
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
        ))}{" "}
      </div>
      <br />
      <GoogleMap events={hotelEvents} />
    </div>
  );
};

export default AddHotel;
