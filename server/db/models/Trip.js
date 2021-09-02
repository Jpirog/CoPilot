const {
  STRING, BOOLEAN, DATE, ENUM,
} = require('sequelize');
const db = require('../db');

const Trip = db.define('trip',{
  destination: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: false,
    validate: { notEmpty: true },
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
  purpose: {
    type: ENUM('VACATION', 'BUSINESS','REUNION','RELAX','OTHER'),
    defaultValue: 'OTHER',
    allowNull: false,
  },
  status: {
    type: ENUM('IN PROGRESS', 'COMPLETED'),
    defaultValue: 'IN PROGRESS',
    allowNull: false,
  },
  breakfast: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  lunch: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  dinner: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
})

module.exports = Trip;
