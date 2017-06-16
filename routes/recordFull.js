var express = require('express');
var router = express.Router();
var Record  = require('../models/Record');
var Mo  = require('../models/Mo');
var Patient  = require('../models/Patient');

/* GET users listing. */
/* GET patients listing. */

router.post('/:id', function(req, res, next) {
      //console.log(req);
      Patient.create(req.body).then(function(patient) {
        req.body.patientId = patient.id;
        Record.create( req.body).then(function(task) {
//         console.log('Success');
           res.send({success: true});
       });
     }); 
});


  router.put('/:id', function(req, res, next) {
//      console.log(req.body.id);
      Record.findById(req.params.id).then(function(record) {
        record.update(req.body).then(function() {
          console.log(req.body);
          Patient.findById(req.body.idPat).then(function(patient) {
            patient.update(req.body).then(function() {
              res.send({success: true});
            })
          })

        })
     })
});


module.exports = router;
