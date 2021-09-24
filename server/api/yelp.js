require('dotenv').config();
const axios = require('axios');
const router = require('express').Router()
const URL = "https://api.yelp.com/v3/businesses/search";
const API_KEY = process.env.API_KEY;
const HEADERS = {"Authorization":`Bearer ${API_KEY}`}

//get all hotels
router.get("/hotel",async (req, res, next) =>{
    try{
        
        const {data} = await axios.get(URL,{
            headers:HEADERS,
            params:{
                'term':req.query.term,
                'location':req.query.location?req.query.location:"NYC",
                "sort_by":"rating",
                "limit":req.query.term?5:20,
                "categories":"hotels"

        },
        })
        res.send(data.businesses)
    }catch(er){next(er)}
})

//get all restaurants
router.get("/restaurants", async (req, res, next) => {
    try{
        const { data } = await axios.get( URL, {
            headers: HEADERS, 
            params: {
                'term': req.query.term,
                'location': req.query.location,
                "limit": req.query.term?5:20,
                "sort_by": "rating",
                "categories": "restaurants",
            } 
        })
        res.send(data.businesses)
    } catch(er) {
        next(er)
    }
})


router.get("/activity",async (req, res, next) =>{
    try{
        
        const {data} = await axios.get(URL,{
            headers:HEADERS,
            params:{
                'term':req.query.term,
                'location':req.query.location?req.query.location:"NYC",
                "sort_by":"rating",
                "limit":20,
                "categories":req.query.category?req.query.category:"All"
            }
    
        })
        res.send(data.businesses)
    }catch(er){next(er)}
})

module.exports = router