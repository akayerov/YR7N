var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET patients listing. */
router.get('/', function(req, res, next) {
  res.send({state:1,  user: {username: req.user.username, displayname: req.user.displayname}});

});


module.exports = router;
