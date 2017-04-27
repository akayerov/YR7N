var Sequelize = require("sequelize");
var sequelize = new Sequelize('postgres://postgres:qwerty7@192.168.65.7:5432/Medic_test');
module.exports = sequelize;
