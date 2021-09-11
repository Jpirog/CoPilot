import axios from "axios";
import React,{useEffect,useDispach,useState} from "react";
import { Link } from "react-router-dom";

const AddHotel= (props)=> {
  

    const [hotelList,setHotelList] = useState([]);

    useEffect(
        ()=>{
          const func = async()=>{
          const {data} =  await axios.get("/api/yelp/hotel");
          setHotelList(data);
            };
            func()
    },[])
    

return (
    <div style={{padding:"20px"}}>
        
<button type="button" onClick={()=>{

}}>Add A Hotel</button>
        <form>
   
        <input placeholder="search for your hotel"></input>
        </form>
        <Link to="/activity">Go to Next:</Link>

        {hotelList.map(hotel=>
        <ul key ={hotel.id} style={{flex:1,flexDirection:"row",padding:"20px"}}>
        <img style={{width:"20%",height:"20%"}} src={hotel.image_url}></img>
        <li >{hotel.name}</li>
        <li >{hotel.rating}</li>
        <li >{hotel.price}</li>
        </ul>)}

        </div>
)


}

export default AddHotel