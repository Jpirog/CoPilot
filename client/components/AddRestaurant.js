import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddRestaurant = () => {
  const [restaurantList, setrestaurantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get("/api/yelp/restaurants");
      setrestaurantList(data);
    };
    func();
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
      setrestaurantList(data);
    };

    func();
  }

  return (
    <div style={{ padding: "20px" }}>
      <button type="button" onClick={() => {}}>
        Add a restaurant
      </button>

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
        </ul>
      ))}
    </div>
  );
};

export default AddRestaurant;
