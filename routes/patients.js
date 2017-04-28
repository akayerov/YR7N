var express = require('express');
var router = express.Router();
var Patient  = require('../models/Patient');

/* GET patients listing. */
router.get('/', function(req, res, next) {
  Patient.findAll().then(function(patients) {
      res.send(patients);
  });
});

router.post('/', function(req, res, next) {
      //console.log(req);
      console.log(req.body.fname, req.body.lname);
      Patient.create( req.body).then(function(task) {
//         console.log('Success');
         res.send('OK');
      });
});

router.delete('/:id', function(req, res, next) {
      Patient.findById(req.params.id).then(function(patient) {
        patient.destroy();
        res.send('OK');
      })
});


router.put('/:id', function(req, res, next) {
      Patient.findById(req.params.id).then(function(patient) {
        patient.update(req.body).then(function() {
          res.send('OK');
        })
     })
});


module.exports = router;
