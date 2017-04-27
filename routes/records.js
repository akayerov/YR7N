var express = require('express');
var router = express.Router();
var Patient  = require('../models/Patient');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var pl = Patient.findAll();
  console.log(pl);
  res.send(Patient.findAll());
});

module.exports = router;
