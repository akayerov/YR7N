(function () {
  'use strict';
  var passport       = require('passport');

  var login = function(req, res, next) {
//    console.log('login func');
    passport.authenticate('local',
      function(err, user, info) {
//        console.log('!!!!', err, user, info);
        return err
          ? next(err)
          : user
            ? req.logIn(user, function(err) {
                return err
                  ? next(err)
                  : res.send('OK');
              })
            : res.send(info.message,403);
      }
    )(req, res, next);
  };
  module.exports = login;
})();
