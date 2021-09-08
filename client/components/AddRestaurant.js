import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddRestaurant = (props)=> {
    const [ restaurantList, setrestaurantList ] = useState( [] );

    useEffect( () => {
        const func = async() => {
            const {data} = await axios.get("/api/yelp/restaurants");
            console.log(data)
            setrestaurantList(data);
        };
        func()
    }, [])
    

    return (
        <div style={{padding:"20px"}}> 
            <button type="button" onClick={ () => {} }>Add A Restaurant</button>
                <form>
                    <input placeholder="search for your restaurant"></input>
                </form>
            <Link to="/hotel">Go to Next:</Link>

            {restaurantList.map(restaurant=>
                <ul key ={restaurant.id} style={ {flex: 1, flexDirection: "row", padding: "20px"} }>
                    <img style={{width: "20%", height: "20%"}} src={restaurant.image_url}></img>
                    <li>{restaurant.name}</li>
                    <li>{restaurant.rating}</li>
                    <li>{restaurant.price}</li>
                </ul>
            )}
        </div>
    )
}

export default AddRestaurant;