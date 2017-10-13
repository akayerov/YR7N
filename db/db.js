var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:qwerty7@192.168.65.7:5432/YR7N");
module.exports = db;
