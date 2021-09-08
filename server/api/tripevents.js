const router = require('express').Router();
const TripEvent = require('../db/models/Event');
module.exports = router;

// add or change a trip event
router.post('/', async (req, res, next) => {
  try {
    const data = await TripEvent.upsert(req.body, { returning: true } );
    res.status(200).send(data[0]);
  } catch (ex) {
    console.log('ERROR adding a trip event', ex);
    next(ex);
  }
})

// remove a trip event
router.delete('/', async (req, res, next) => {
  try {
    const eventId = req.body.eventId;
    const data = await TripEvent.destroy({
      where: { id: eventId }
    });
    res.status(200).send({});
  } catch (ex) {
    console.log('ERROR deleting a trip event', ex);
    next(ex);
  }
})

