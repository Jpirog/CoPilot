const router = require('express').Router();
const { models: { Price }} = require('../db');
//const TripPrice = require('../db/models/Price');
module.exports = router;

router.post('/', async (req, res, next) => {
    try {
      const data = await Price.create(req.body);
      res.status(200).send(data);
    } catch (ex) {
      console.log('ERROR adding price', ex);
      next(ex);
    }
  })

  router.delete('/', async (req, res, next) => {
    try {
      const price = req.body.priceId;
      const data = await Price.destroy({
        where: { priceId: price }
      });
      res.status(200).send({});
    } catch (ex) {
      console.log('ERROR deleting a trip expense', ex);
      next(ex);
    }
  })