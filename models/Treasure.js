const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const MoneyValue = require('../models/MoneyValue');

const Treasure = sequelize.define('treasures', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
});

Treasure.hasMany(MoneyValue, {
  foreignKey: 'treasure_id',
  as: 'moneyValue',
});

module.exports = Treasure;
