import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTripEvent, removeTripEvent } from "../store/trips";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";
import StarRatings from "react-star-ratings";
import AutoComInput from "./GoogleAutoComplete"

const AddRestaurant = (props) => {
  const { tripId, tripevents, trip } = useSelector((state) => ({
    trip: state.trips.trip,
    tripId: state.trips.trip.id,
    tripevents: state.trips.trip.tripevents,
  }));

  const [restaurantList, setRestaurantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [meal, setMeal] = useState("DEFAULT");
  const [sortValue, setSortValue] = useState("");
  const [changeId, setChangeId] =useState("")

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
    if (sortValue === "Rating") {
      list = restaurantList.sort(function (a, b) {
        return b.rating - a.rating;
      });
      setRestaurantList([...list]);
    } else if (sortValue === "PriceLowToHigh") {
      list = restaurantList.filter((obj) => obj.price).sort(function (a, b) {
          return a.price.length - b.price.length;
      });
      setRestaurantList(
        list.concat(restaurantList.filter((obj) => !obj.price))
      )
    } else if (sortValue === "PriceHighToLow") {
      list = restaurantList.filter((obj) => obj.price).sort(function (a, b) {
          return b.price.length - a.price.length;
      });
      setRestaurantList(
        list.concat(restaurantList.filter((obj) => !obj.price))
      )
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
            <th>Start date</th>
            <th>End date</th>
            <th>Restaurant name</th>
            <th>Event description</th>
            <th>Restaurant website</th>
            <th>Restaurant location </th>
            <th>delete</th>
          </tr>
          {tripevents &&
            tripevents.map((event) =>
              event.purpose === "Lunch" ||
              event.purpose === "Breakfast" ||
              event.purpose === "Dinner" ? (
                <tr key={event.id}>
                  <td scope="row">
                    {dateFormat(event.startDate, "mm/dd/yyyy h:MM TT")}
                  </td>
                  <td scope="row">
                    {dateFormat(event.endDate, "mm/dd/yyyy h:MM TT")}
                  </td>
                  <td>{event.placeName}</td>
                  <td>{event.description}</td>
                  <td>
                    <a href={event.url} target="_blank" rel="noreferrer">
                      Link of Website
                    </a>
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
          <span className="input-group-text mr-md-3">
            You can change a destination or search for a restaurant
          </span>
          <AutoComInput
            type="text"
            aria-label="location"
            className="form-control"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <input
            autoFocus
            type="text"
            aria-label="hotel"
            className="form-control"
            placeholder="search for your restaurant"
            value={searchValue}
            onChange={restaurantSearchFieldChange}
          />

          <button type="submit" className="btn btn-outline-primary input-group-text">
            Search
          </button>

          <button
            type="button"
            className="btn btn-outline-primary input-group-text mr-md-3"
            onClick={() => {
              setSearchValue("");
            }}
          >
            Clear
          </button>
          <select
            className="btn btn-outline-primary input-group-text"
            aria-label=".form-select-lg example"
            value={sortValue}
            onChange={(e) => {
              setSortValue(e.target.value);
            }}
          >
            <option>Sort by</option>
            <option value={"Rating"}>Rating: High to low</option>
            <option value={"PriceLowToHigh"}>Price: Low to High</option>
            <option value={"PriceHighToLow"}>Price: High to Low</option>
          </select>
        </div>
      </form>
      <br />
      <div>
        <Link to={`/activity`} className="btn btn-outline-primary">
        Once restaurants are added, click here to go to add activities
        </Link>
      </div>
      <br />
      <div className="d-lg-flex flex-row align-content-around flex-wrap mr-md-6">
        {restaurantList.map((restaurant) => (
          <ul
          className="shadow-lg mx-auto p-3 d-flex flex-column align-content-center flex-wrap bg-white rounded"
            key={restaurant.id}
            style={{
              padding: "10%",
              width: "30%",
              listStyleType: "none",
              textAlign: "center",
            }}
          >
            {/*rel="noreferrer" added for security reason to prevent referrer info leaks */}
            <a href={restaurant.url} target="_blank" rel="noreferrer">
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
                rating={restaurant.rating}
                starRatedColor="gold"
                starDimension="20px"
                starSpacing="3px"
              />
            </li>
            <li>{restaurant.price?restaurant.price:`No Price Info`}</li>
            <li style={{marginBottom:"3.5px"}}>
              <form onSubmit={() => {}}>
                <select
                  value={changeId===restaurant.id?meal:""}
                  onChange={(e) => {
                    setChangeId(restaurant.id)
                    setMeal(e.target.value);
                    if(e.target.value === 'Breakfast'){
                      setStartDate((new Date(trip.startDate)).setHours(8, 0, 0));
                      setEndDate((new Date(trip.startDate)).setHours(10, 0, 0))
                    } else if (e.target.value === 'Lunch') {
                      setStartDate((new Date(trip.startDate)).setHours(12, 0, 0));
                      setEndDate((new Date(trip.startDate)).setHours(14, 0, 0))
                    } else if(e.target.value === 'Dinner'){
                      setStartDate((new Date(trip.startDate)).setHours(18, 0, 0));
                      setEndDate((new Date(trip.startDate)).setHours(20, 0, 0))
                    }
                  }}
                >
                  <option value={"DEFAULT"}>{"Select a Meal"}</option>
                  <option value={"Breakfast"}>{"Breakfast"}</option>
                  <option value={"Lunch"}>{"Lunch"}</option>
                  <option value={"Dinner"}>{"Dinner"}</option>
                </select>
              </form>
            </li>
            <li style={{marginBottom:"3.5px"}}>
              <form>
                <input
                  placeholder="add event description"
                  value={changeId===restaurant.id?description:""}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></input>
              </form>
            </li>
<li style={{marginBottom:"3.5px"}}>
            <DatePicker
              placeholderText="Select a date"
              timeInputLabel="Pick a time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              includeDates={availableDates()}
              selected={changeId===restaurant.id?startDate:null}
              showTimeInput
              onChange={(date) => {
                setStartDate(date);
                setEndDate(new Date(Date.parse(date) + 60000 * 120));
              }}
              withPortal
            />

</li>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                if (meal === "DEFAULT") {
                  alert("Please select a meal");
                } else if (description === "") {
                  alert("Please add a description");
                } else if (startDate) {
                  dispatch(
                    addTripEvent({
                      purpose: meal,
                      startDate,
                      endDate,
                      tripId,
                      description,
                      placeName: restaurant.name,
                      url: restaurant.url,
                      location: restaurant.location.display_address.join(""),
                      yelpId: restaurant.id,
                      rating: restaurant.rating,
                      priceLevel: restaurant.price,
                    })
                  );
                } else {
                  alert("please select date");
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
