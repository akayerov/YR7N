var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('importForm', { title: 'ЯР7Н - регистр назологий', date_b:'2017-10-18' });
   res.render('importForm', {doc : { title: 'ЯР7Н - регистр назологий', date_b:'2017-07-05' , date_e:'2017-07-14'}});
});

module.exports = router;
