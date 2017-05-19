(function () {
  'use strict';
  var passport       = require('passport');
// kir
  var JwtCtrl = require('../controllers/jwt.controller');

  var login = function(req, res, next) {
/*
    passport.authenticate('local',
      function(err, user, info) {
        console.log('!!!!', info);
        return err
          ? next(err)
          : user
            ? req.logIn(user, function(err) {
                return err
                  ? next(err)
                  : res.send({state:1,  user: {username: user.username, displayname: user.displayname}});
              })
              : res.status(403).send({state:0, info: { err: info.message}});

      }
    )(req, res, next);
*/
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ success: false, error: 'need username and password'})
    }
    if (req.body.username === 'vas' && req.body.password === 'vas') {
       var user = { id: 'vas', name: 'Vasya', username: 'vas' }
       res.json({
         success: true,
         token: 'JWT ' + JwtCtrl.generateToken(user),
         user: user,
       })
    }
    else {
      return res.status(400).json({ success: false, error: 'incorrect username or password'})
    }

  };

  module.exports = login;
})();
