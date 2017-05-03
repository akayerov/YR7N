// Из другого проекта для passport
// позднее надо переделать под sequalize

var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:qwerty7@192.168.65.7:5432/Medic_test");
module.exports = db;
