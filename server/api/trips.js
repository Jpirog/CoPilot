const router = require('express').Router()
const { models: { Trip }} = require('../db')
module.exports = router

router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId,{
//      attributes: ['id', 'username']
    })
    res.send(trip);
  } catch (err) {
    next(err)
  }
})
