//const Sequelize = require('sequelize');
const {
  STRING, BOOLEAN, DATE, ENUM,TEXT
} = require('sequelize');
const db = require('../db');

const TripEvent = db.define('tripevent',{
  purpose: {
    type: ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'SIGHTSEE','FREETIME','SLEEP','OTHER'),
    defaultValue: 'OTHER',
    allowNull: false,
  },
  description: {
    type: TEXT,
    required: true,
    allowNull: false,
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
})

module.exports = TripEvent;
