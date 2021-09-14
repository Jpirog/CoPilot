const router = require('express').Router();
const Trip = require('../db/models/Trip');
const User = require('../db/models/User');
const TripAttendee = require('../db/models/TripAttendee');
module.exports = router;

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

// returns all trips that a user was invited to where no response is recorded (open invitations)
router.get('/needresponse/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      include: [{model: User, as: 'owner'}, { model: TripAttendee, where: { userId: req.params.userId, responseDate: null } },
      ]
    })
    res.send(trips);
  } catch (err) {
    next(err)
  }
})

// update a user's trip response
router.put('/response', async (req, res, next) => {
  try {
    const data = await TripAttendee.update({ accepted: req.body.response, responseDate: new Date()}, { 
      where: { tripId: req.body.tripId, userId: req.body.userId }, returning: true } );
    res.sendStatus(200);
  } catch (ex) {
    console.log('ERROR updating a trip attendee response', ex);
    next(ex);
  }
})
