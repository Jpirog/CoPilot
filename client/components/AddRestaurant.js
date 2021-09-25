/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTripEvent, removeTripEvent } from "../store/trips";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StarRatings from "react-star-ratings"

const AddRestaurant = (props) => {
  const { tripId, tripevents, trip } = useSelector((state) => ({
    trip: state.trips.trip,
    tripId: state.trips.trip.id,
    tripevents: state.trips.trip.tripevents,
  }));

  const [restaurantList, setRestaurantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [meal, setMeal] = useState("DEFAULT");
  const [sortValue, setSortValue] = useState("");

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
    let list;
    if (sortValue === "rating") {
      list = restaurantList.sort(function (a, b) {
        return b.rating - a.rating;
      });
      console.log(list);
      setRestaurantList(list);
    } else if (sortValue === "price") {
      list = restaurantList.sort(function (a, b) {
        return a.price ? a.price.length : 0 - b.price.length
      });
      console.log(list);
      setRestaurantList(list);
    }
  }, [sortValue]);

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get("/api/yelp/restaurants", {
        params: { location: trip.destination },
      });
      setRestaurantList(data);
    };

    if (trip.destination) {
      func();
      setLocation(trip.destination);
      setDescription("");
      setStartDate(null);
      setMeal("DEFAULT");
    }
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
    <div id="content-wrapper" style={{ padding: "100px" }}>
      <div className="d-lg-flex flex-column align-content-center flex-wrap mr-md-6"></div>
      <table className="table table-hover shadow p-3 mb-5 bg-white rounded">
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
              event.purpose === "LUNCH" ||
              event.purpose === "BREAKFAST" ||
              event.purpose === "DINNER" ? (
                <tr key={event.id}>
                  <td>{event.startDate}</td>
                  <td>{event.placeName}</td>
                  <td>{event.description}</td>
                  <td>
                    <a href={event.url} target="_blank">Website Link</a>
                  </td>
                  <td>{event.location}</td>
                  <td>
                    <button
                     className="btn btn-outline-danger"
                      type="button"
                      onClick={() => {
                        dispatch(removeTripEvent(tripId, event.id));
                      }}
                    >
                     <i className="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>

      <form onSubmit={restaurantSearchSubmit}>
      <div className="input-group">
  <span className="input-group-text mr-md-3">You can change a destination or search for a restaurant</span>
  <input
    type="text" aria-label="location" className="form-control" 
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <input
          autoFocus type="text" aria-label="hotel" className="form-control" 
          placeholder="search for your restaurant"
          type="text"
          value={searchValue}
          onChange={restaurantSearchFieldChange}
        />

<button type="submit" className="btn btn-primary input-group-text">Search</button>
  <button type="button" className="btn btn-primary input-group-text mr-md-3"
  onClick={() => {
    setSearchValue("");
  }}
>
  Clear
</button>
<select
  className="btn btn-primary input-group-text" aria-label=".form-select-lg example" 
        value={sortValue}
        onChange={(e) => {
          setSortValue(e.target.value);
        }}
      >
        <option>Sort By</option>
        <option value="rating">rating-High to Low</option>
        <option value="price">price-Low to High</option>
      </select>
        </div>
    </form>


<br />

<div>
      <Link to={`/activity`} className="btn btn-primary">
        Once restaurant is selected, go to activities
      </Link>
</div>
      
      <br />
      <div className="d-lg-flex flex-row align-content-around flex-wrap mr-md-6"> 
      {restaurantList.map((restaurant) => (
        <ul
        className="shadow-lg mx-auto p-3 d-flex flex-column align-content-center flex-wrap bg-white rounded"
          key={restaurant.id} style={{ padding: "10%", width:"30%",listStyleType: "none" ,textAlign:"center"}}
        >
          <a href={restaurant.url} target="_blank">
            <img
           className="img-thumbnail"
           style={{ width: "300px", height: "300px" }}
              src={restaurant.image_url}
            ></img>
          </a>
          <li>{restaurant.name}</li>
          <li>
            {" "}
            <StarRatings
              rating = {restaurant.rating}
              starRatedColor = 'gold'
              starDimension = '20px'
              starSpacing = '3px'
            />
          </li>
          <li>{restaurant.price}</li>
          <li>
            <form onSubmit={() => {}}>
              <select
                value={meal}
                onChange={(e) => {
                  setMeal(e.target.value);
                }}
              >
                <option value={"DEFAULT"}>{"Select a Meal"}</option>
                <option value={"BREAKFAST"}>{"Breakfast"}</option>
                <option value={"LUNCH"}>{"Lunch"}</option>
                <option value={"DINNER"}>{"Dinner"}</option>
              </select>
            </form>
          </li>
          <li>
            <form>
              <input
                placeholder="add event description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
            </form>
          </li>

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
          className="btn btn-outline-secondary"
            onClick={() => {
              if (startDate) {
                dispatch(
                  addTripEvent({
                    purpose: meal,
                    startDate,
                    tripId,
                    description,
                    placeName: restaurant.name,
                    url: restaurant.url,
                    location: restaurant.location.display_address.join(""),
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
    </div>
  );
};

export default AddRestaurant;
