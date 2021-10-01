const router = require('express').Router();
const Trip = require('../db/models/Trip');
const User = require('../db/models/User');
const TripAttendee = require('../db/models/TripAttendee');
const nodemailer = require('nodemailer');
const dateFormat = require('dateformat')

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

// update a new user's trip invites with the user ID (which is not known if they were not registererd)
router.put('/updateid', async (req, res, next) => {
  try {
    const data = await TripAttendee.update(
      { userId: req.body.userId}, 
      { where: { email: req.body.username }} );
    res.sendStatus(200);
  } catch (ex) {
    console.log('ERROR updating a trip attendee ID based off username (email)', ex);
    next(ex);
  }
})


// send an email to the newly invited user
router.post('/send', async (req, res, next) => {
  const { recipientEmail, subject, msgData } = req.body;
  // msgData: { type: 'invited', host: ownername, fromDate: date, toDate: date, dest: destination }

  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOSTNAME,
      port: process.env.NODEMAILER_PORT,
      secure: false,
      
      auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD
      },
  });

  const msg = `
  <img width="200" height="140" src='https://rjginc.com/wp-content/uploads/2018/10/CoPilot_Logo-web-2.png'>
  <h1>Date: ${dateFormat(new Date(), "ddd, mmm d, yyyy")}</h2>
  <h1>You're invited!!!<h1>
  <h2>Hello!</h2>
    <h3>${msgData.host} has invited you on a trip to <h1>${msgData.dest}</h1> and wants you to collaborate to build out the itinerary.</h3>
    <p>Please login or register at <a href="https://copilotfsa.com">https://copilotfsa.com</a></p>
    <p>Sincerely,</p>
    <p>The CoPilot team</p>
    `
    // Message object
  const message = {
      from: 'CoPilot <no-reply@copilotfsa.com>',
      to: recipientEmail,
      subject: subject,
      text: 'Hello to myself!',
      html: msg,
  };

  transporter.sendMail(message, (err, info) => {
      if (err) {
          console.log('Error occurred sending email - ' + err.message);
          return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
});
