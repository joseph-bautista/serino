const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Treasure = require('../models/Treasure');

const MoneyValue = sequelize.define('money_values', {
  treasure_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});
module.exports = MoneyValue;
