const Sequelize = require('sequelize');
const dbs = require('../db/db');

const Admins = dbs.define('admins', {

  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  authority: {
    type: Sequelize.NUMBER,
  },
});

module.exports = Admins;