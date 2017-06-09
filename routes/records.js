var express = require('express');
var router = express.Router();
var Record  = require('../models/Record');
var Mo  = require('../models/Mo');
var Patient  = require('../models/Patient');

/* GET users listing. */
/* GET patients listing. */
router.get('/', function(req, res, next) {
   var RecScope =   Record;
   if( req.query.state) {
      if( req.query.state == '0')
        var RecScope =   Record.scope('started');
      else   if( req.query.state == '1')
        var RecScope =   Record.scope('ended');
   }

//  Record.scope('started').findAll({
   if( req.user.role == 0) {
       RecScope.findAll({
         where: {
           moId :  req.user.moId
         },
         include: [
         { model: Mo }, // load all Mo
         { model: Patient }, // load patient
        ]}
       ).then(function(records) {
          res.send(records);
      });
    }
    else {
      RecScope.findAll({
        include: [
        { model: Mo }, // load all Mo
        { model: Patient }, // load patient
       ]}
      ).then(function(records) {
         res.send(records);
     });

    }
});


module.exports = router;
