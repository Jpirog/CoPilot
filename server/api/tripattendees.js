const router = require('express').Router()
//const { models: { Trip, Event }} = require('../db')
const TripAttendee = require('../db/models/TripAttendee')
module.exports = router

// // returns all attendees for a trip
// router.get('/:tripId', async (req, res, next) => {
//   try {
//     const tripAttendees = await TripAttendee.findAll({
//       where: { tripId: req.params.tripId },
// //      include: { all: true, nested: true }
//     })
// //    console.log('***', req.params.tripId, tripAttendees)
//     res.send(tripAttendees);
//   } catch (err) {
//     next(err)
//   }
// })

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
//    console.log('=====',req)
    const trip = req.body.tripId;
    const email = req.body.email;
    const data = await TripAttendee.destroy({
      where: { tripId: trip, email: email }
    });
    res.status(200);
  } catch (ex) {
    console.log('ERROR deleting a trip attendee', ex);
    next(ex);
  }
})