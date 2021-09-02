//const Sequelize = require('sequelize');
const {
  STRING, BOOLEAN, DATE, ENUM,
} = require('sequelize');
const db = require('../db');

const Event = db.define('event',{
  purpose: {
    type: ENUM('MEAL', 'SIGHTSEE','FREETIME','OTHER'),
    defaultValue: 'OTHER',
    allowNull: false,
  },
  description: {
    type: STRING,
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

module.exports = Event;
