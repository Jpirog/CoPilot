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
    res.send(trips);
  } catch (err) {
    next(err)
  }
})

// returns all trips that a user was invited to
router.get('/userinvited/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      include: [{ model: TripAttendee, where: { userId: req.params.userId, accepted: true } },
        // {model: Event}
      ]
//      where: { ownerId: req.params.userId },
//      include: { all: true, nested: true }
    })
    res.send(trips);
  } catch (err) {
    next(err)
  }
})

// add/update trip
router.post('/', async (req, res, next) => {
    try {
      const data = await Trip.upsert(req.body, { returning: true } );
      res.status(200).send(data[0]);
    } catch (ex) {
      console.log('ERROR adding/updating trip', ex);
      next(ex);
    }
  })

// set vote open or closed
router.post('/vote', async (req, res, next) => {
  const tripId = req.body.tripId * 1;
  const action = req.body.action;
  try {
    const data = await Trip.update(
      { voteOpened: action },
      { where: {id: tripId} }, 
      { returning: true } );
    res.sendStatus(200);
  } catch (ex) {
    console.log('ERROR updating trip vote', ex);
    next(ex);
  }
})
