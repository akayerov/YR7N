var express = require('express');
var router = express.Router();
var dateYMD = require('../util/dateYMD');
/* GET home page. */
router.get('/', function(req, res, next) {
   let idate_b = dateYMD(new Date(2017,0,1));
   let idate_e = dateYMD(new Date());
   res.render('importForm', {doc : { title: 'ЯР7Н - регистр назологий',
               idate_b: idate_b , idate_e:idate_e,
               date_b:'2017-07-05' , date_e:'2017-07-14'}});
});

module.exports = router;
