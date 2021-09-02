//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Trip = require('./models/Trip')
const Event = require('./models/Event');
const TripAttendee = require('./models/TripAttendee');
const EventAttendee = require('./models/EventAttendee');

//associations 
Trip.belongsTo(User, {as: 'owner'});
TripAttendee.belongsTo(Trip);
Event.belongsTo(Trip);
EventAttendee.belongsTo(Event);
//User.hasMany(Trip, {as: 'owner'});
Trip.hasMany(TripAttendee);
Trip.hasMany(Event);
Event.hasMany(EventAttendee);
TripAttendee.belongsTo(User);
EventAttendee.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Trip,
    TripAttendee,
    Event,
    EventAttendee,
  },
}
