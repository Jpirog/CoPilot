const router = require('express').Router()
const TripAttendee = require('../db/models/TripAttendee')
module.exports = router

// add a trip attendee
router.post('/', async (req, res, next) => {
  try {
    const data = await TripAttendee.upsert(req.body, { returning: true } );
    res.status(200).send(data[0]);
  } catch (ex) {
    console.log('ERROR adding a trip attendee', ex);
    next(ex);
  }
})

// remove a trip attendee
router.delete('/', async (req, res, next) => {
  try {
    const trip = req.body.tripId;
    const email = req.body.email;
    const data = await TripAttendee.destroy({
      where: { tripId: trip, email: email }
    });
    res.status(200).send({});
  } catch (ex) {
    console.log('ERROR deleting a trip attendee', ex);
    next(ex);
  }
})