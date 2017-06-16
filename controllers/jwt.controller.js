var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var User  = require('../db/passport-user');


var jwtOptions = {
  secretOrKey: 'jwtSecret',
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
}

var generateToken = function(user) {
  var token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey);
  return token;
}

var jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
   User.findById(payload.id,function(err, user) {
     delete user.password;
     if (err) { return done(err, false); }
     if (user) {
       done(null, user);
     } else {
       done(null, false);
     }
   });
//  done(null, { name: 'Vasya', id: 'vas' });
});

module.exports = {
  generateToken: generateToken,
  jwtOptions: jwtOptions,
  jwtStrategy: jwtStrategy,
}
