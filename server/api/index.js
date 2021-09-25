const router = require('express').Router();
module.exports = router;

//router.use(express.urlencoded({extended: false})); // needed for processing the POST
router.use(require('method-override')('_method')); // needed for DELETE method

router.use('/users', require('./users'));
router.use('/trips', require('./trips'));
router.use('/tripattendees', require('./tripattendees'));
router.use('/tripevents', require('./tripevents'));

//for yelp api routes
router.use('/yelp',require("./yelp"));
//for google api routes
router.use('/google',require("./google"));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
