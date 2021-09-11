require('dotenv').config();
const axios = require('axios');
const router = require('express').Router()
const URL = "https://api.yelp.com/v3/businesses/search";
const API_KEY = process.env.API_KEY;
const HEADERS = {"Authorization":`Bearer ${API_KEY}`}
const PARAMETERS = {
    'term':"hotel",
    'location':"NYC",
    "limit":20,
    "sort_by":"rating"
};

//get all hotels
router.get("/hotel", async (req, res, next) =>{
    try{
        const { data } = await axios.get( URL, { headers: HEADERS, params: PARAMETERS })
        res.send(data.businesses)
    } catch(er) {
        next(er)
    }
})

//get all restaurants
router.get("/restaurants", async (req, res, next) => {
    try{
        const { data } = await axios.get( URL, {
            headers: HEADERS, 
            params: {
                'term': "restaurant",
                'location': "NYC",
                "limit": 20,
                "sort_by": "rating"
            } 
        })
        res.send(data.businesses)
    } catch(er) {
        next(er)
    }
})

module.exports = router