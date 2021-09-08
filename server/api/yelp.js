require('dotenv').config();
const axios = require('axios');
const router = require('express').Router()
const URL = "https://api.yelp.com/v3/businesses/search";
const API_KEY = process.env.API_KEY;
const HEADERS = {"Authorization":`Bearer ${API_KEY}`}
const PARAMETERS={
    'term':"hotel",
    'location':"NYC",
    "limit":20,
    "sort_by":"rating"
};
module.exports = router

//get all hotels
router.get("/hotel",async (req, res, next) =>{
    try{
        
        const {data} = await axios.get(URL,{headers:HEADERS,params:PARAMETERS,
        })
        console.log(data.businesses)
        res.send(data.businesses)
    }catch(er){next(er)}
})