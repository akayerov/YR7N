var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('importForm', { title: 'ЯР7Н - регистр назологий' });
});

module.exports = router;
