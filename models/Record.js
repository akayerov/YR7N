var Sequelize = require("sequelize");
var sequelize = require('../db/connection');

var Record = sequelize.define('records', {
  date_rec: {
    type: Sequelize.DATE
  },
  date_in: {
    type: Sequelize.DATE
  },
  state: {
    type: Sequelize.INTEGER
  },
});

module.exports = Record;
