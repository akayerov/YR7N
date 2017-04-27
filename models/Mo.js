var Sequelize = require("sequelize");
var sequelize = require('../db/connection');

var Mo = sequelize.define('mo', {
  name: {
    type: Sequelize.STRING
  },
  ogrn: {
    type: Sequelize.STRING
  },
});

module.exports = Mo;
