var express = require('express');
var router = express.Router();
var Record  = require('../models/Record');

/* GET users listing. */
/* GET patients listing. */
router.get('/', function(req, res, next) {
  Record.findAll().then(function(patients) {
      res.send(patients);
  });
});


router.post('/', function(req, res, next) {
      //console.log(req);
      console.log(req.body.fname, req.body.lname);
      Record.create( req.body).then(function(task) {
//         console.log('Success');
         res.send('OK');
      });
});

router.delete('/', function(req, res, next) {
//      console.log(req.body.id);
      Record.findById(req.body.id).then(function(Record) {
        Record.destroy();
        res.send('OK');
      })
});


router.put('/', function(req, res, next) {
//      console.log(req.body.id);
      Record.findById(req.body.id).then(function(Record) {
        Record.update(req.body).then(function() {
          res.send('OK');
        })
     })
});


module.exports = router;
