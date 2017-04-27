var Sequelize = require("sequelize");
var sequelize = require('../db/connection');

var Patient = sequelize.define('patients', {
  fname: {
    type: Sequelize.STRING
  },
  sname: {
    type: Sequelize.STRING
  },
  lname: {
    type: Sequelize.STRING
  },
  sity: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  house: {
    type: Sequelize.STRING
  },
  kvart: {
    type: Sequelize.STRING
  },
});

module.exports = Patient;
