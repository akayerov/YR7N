var express = require('express');
var router = express.Router();
var Record  = require('../models/Record');
var Mo  = require('../models/Mo');
var Patient  = require('../models/Patient');

/* GET users listing. */
/* GET patients listing. */

router.post('/', function(req, res, next) {
      //console.log(req);
      Record.create( req.body).then(function(task) {
//         console.log('Success');
         res.send('OK');
      });
});

router.get('/:id', function(req, res, next) {
/*
       Record.findById(req.params.id).then(function(record) {
        res.send(record);
      })
*/
     Record.findOne({
       where: {
         id : req.params.id,
       },
       include: [
       { model: Mo }, // load all Mo
       { model: Patient }, // load patient
      ]
     }).then(function(record) {
      res.send(record);
     })
});


router.delete('/:id', function(req, res, next) {
//      оригинальный способ по переданному id в body, но мыработает в духе REST
//      Record.findById(req.body.id).then(function(Record) {
       console.log("Now will delete:",req.params.id);
       Record.findById(req.params.id).then(function(record) {
        if( record.state == 0 && req.user.moId == record.moId) {
          console.log("destroy:");
          var patientId = record.patientId;
          record.destroy().then(()=>{
            console.log('DESTROY OK');
            Patient.findById(patientId).then(function(patient) {
              patient.destroy().then(()=>{
                res.send({success: true});
              }).catch(err => res.send({success: false, err: "Error destroy patient"}));  
            }).catch(err => res.send({success: false, err: "Patient not found"}));
          }).catch(err => res.send({success: false, err: "Error destroy record"}));
        }
        else {
          res.send({success: false, err: "Not right fo delete"});
        }
      }).catch(err => res.send({success: false, err: "Record no found"}));
});


  router.put('/:id', function(req, res, next) {
//      console.log(req.body.id);
      Record.findById(req.params.id).then(function(record) {
        record.update(req.body).then(function() {
          res.send({success: true});
        })
     })
});


module.exports = router;
