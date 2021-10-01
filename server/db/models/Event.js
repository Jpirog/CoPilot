//const Sequelize = require('sequelize');
const {
  STRING, BOOLEAN, DATE, ENUM,TEXT, FLOAT, INTEGER,
} = require('sequelize');
const db = require('../db');

const TripEvent = db.define('tripevent',{
  purpose: {
    type: ENUM('Sleep', 'Breakfast', 'Lunch', 'Dinner', 'Morning activity','Afternoon activity','Night activity', 'Other'),
    defaultValue: 'Other',
    allowNull: false,
  },
  description: {
    type: TEXT,
    required: true,
    allowNull: false,
    unique: false, 
  },
  placeName: {
    type: TEXT,
    required: false,
    allowNull: true,
    unique: false, 
  },
  url: {
    type: TEXT,
    required: false,
    allowNull: true,
    unique: false, 
  },
  location: {
    type: TEXT,
    required: false,
    allowNull: true,
    unique: false, 
  },
  yelpId: {
    type: TEXT,
    required: false,
    allowNull: true,
    unique: false, 
  },
  rating: {
    type: FLOAT,
    required: false,
    allowNull: true,
    unique: false,
  },
  priceLevel: {
    type: STRING,
    required: false,
    allowNull: true,
    unique: false,
  },
  startDate: {
    type: DATE,
    required: false,
    allowNull: true,
    unique: false, 
  },
  endDate: {
    type: DATE,
    required: false,
    allowNull: true,
    unique: false, 
  },
  status: {
    type: ENUM('PROPOSED', 'ACCEPTED'),
    defaultValue: 'PROPOSED',
    allowNull: false,
  },
  votes: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
})

module.exports = TripEvent;
