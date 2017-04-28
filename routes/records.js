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
      Record.create( req.body).then(function(task) {
//         console.log('Success');
         res.send('OK');
      });
});

router.delete('/:id', function(req, res, next) {
//      оригинальный способ по переданному id в body, но мыработает в духе REST
//      Record.findById(req.body.id).then(function(Record) {
       Record.findById(req.params.id).then(function(Record) {
        Record.destroy();
        res.send('OK');
      })
});


//router.put('/', function(req, res, next) {
  router.put('/:id', function(req, res, next) {
//      console.log(req.body.id);
      Record.findById(req.params.id).then(function(Record) {
        Record.update(req.body).then(function() {
          res.send('OK');
        })
     })
});


module.exports = router;
