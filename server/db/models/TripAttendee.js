const {
  STRING, BOOLEAN, DATE, ENUM, 
} = require('sequelize');
const db = require('../db');

const TripAttendee = db.define('tripattendee',{
  email: {
    type: STRING,
    required: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  accepted: {
    type: BOOLEAN,
    required: true,
    allowNull: false,
    defaultValue: false, 
  },
  responseDate: {
    type: DATE,
    required: false,
    allowNull: true,
    unique: false, 
  },
  voted: {
    type: BOOLEAN,
    required: true,
    allowNull: false,
    defaultValue: false, 
  },
}, {indexes: [{ unique: true, fields: ['tripId', 'email']}]})

module.exports = TripAttendee;
