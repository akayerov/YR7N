var Sequelize = require("sequelize");
var sequelize = require('../db/connection');

var User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING
  },
  displayname: {
    type: Sequelize.STRING
  },
  role : {
    type: Sequelize.INTEGER
  }
});

module.exports = User;
