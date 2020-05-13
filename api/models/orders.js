const Sequelize = require('sequelize');
const dbs = require('../db/db');

const Orders = dbs.define('orders', {

  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  wooid: {
    type: Sequelize.INTEGER,
  },
  kozzeteve: {
    type: Sequelize.DATE,
  },
  allapot: {
    type: Sequelize.INTEGER,
  },
  termekneve: {
    type: Sequelize.STRING,
  },
  szamlazasinev: {
    type: Sequelize.STRING,
  },
  datum: {
    type: Sequelize.DATE,
  },
  mennyiseg: {
    type: Sequelize.NUMBER,
  },
  vegosszeg: {
    type: Sequelize.NUMBER,
  },
  fizetesimod: {
    type: Sequelize.STRING,
  },
  megjegyzes: {
    type: Sequelize.STRING,
  },
  megerkezett: {
    type: Sequelize.INTEGER,
  },
  vasznak: {
    type: Sequelize.TEXT,
  }

});

module.exports = Orders;