var express = require('express');
var router = express.Router();
var Patient  = require('../models/Patient');

/* GET patients listing. */
router.get('/', function(req, res, next) {
  Patient.findAll().then(function(patients) {
      res.send(patients);
  });
});

module.exports = router;
