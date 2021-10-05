const { STRING, NUMBER, TEXT, FLOAT } = require('sequelize');
const db = require('../db');

const Price = db.define('price', {
    description: {
        type: TEXT,
        allowNull: false,
        validate: { notEmpty: true }
    },
    price: {
        type: FLOAT,
        alllowNull: false,
        validate: { notEmpty: true }
    }
})

module.exports = Price;