(function () {
  'use strict';
  var passport       = require('passport');

  var login = function(req, res, next) {
//    console.log(req);
    passport.authenticate('local',
      function(err, user, info) {
//        console.log('!!!!', err, user, info);
        console.log('!!!!', info);
        return err
          ? next(err)
          : user
            ? req.logIn(user, function(err) {
                return err
                  ? next(err)
                  : res.send({username: user.username, displayname: user.displayname});
              })
//            : res.send(info.message,403);
              : res.status(403).send({ err: info.message});

      }
    )(req, res, next);
  };
  module.exports = login;
})();
