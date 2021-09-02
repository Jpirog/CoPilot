const {
  STRING, BOOLEAN, DATE, ENUM,
} = require('sequelize');
const db = require('../db');

const EventAttendee = db.define('eventattendee',{
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
})

module.exports = EventAttendee;
