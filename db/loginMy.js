(function () {
  'use strict';
  var passport       = require('passport');
// kir
  var JwtCtrl = require('../controllers/jwt.controller');
  var User  = require('./passport-user');

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
    console.log('username', req.body.username);
    console.log('password', req.body.password);

    User.findOne( req.body.username,function(err,user){
         console.log(err);
         console.log(user);
       if( user ) {
         if(req.body.password === user.password) {
           // не передавать на клиент лишние поля - пароль наприме
           delete user.password;
           return  res.json({
                     success: true,
                     token: 'JWT ' + JwtCtrl.generateToken(user),
                     user: user,
                   })
         }
         else
           return res.status(400).json({ success: false, error: 'incorrect username or password'})
      }
      else {
        return res.status(400).json({ success: false, error: 'incorrect username or password'});
      }
    });

  };

  module.exports = login;
})();
