const router = require('express').Router()
const { models: { Trip, Event }} = require('../db')
const TripAttendee = require('../db/models/TripAttendee')
module.exports = router

// returns all details on a specific trip
router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId,{
      include: { all: true, nested: true }
    })
    res.send(trip);
  } catch (err) {
    next(err)
  }
})

// returns all trips that a user created
router.get('/usercreated/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: { ownerId: req.params.userId },
      include: { all: true, nested: true }
    })
    console.log('***', req.params.userId, trips)
    res.send(trips);
  } catch (err) {
    next(err)
  }
})

// returns all trips that a user was invited to
router.get('/userinvited/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      include: [{ model: TripAttendee, where: { userId: req.params.userId } },
        {model: Event}
      ]
//      where: { ownerId: req.params.userId },
//      include: { all: true, nested: true }
    })
    console.log('***', trips)
    res.send(trips);
  } catch (err) {
    next(err)
  }
})
