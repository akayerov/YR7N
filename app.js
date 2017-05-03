var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var patients = require('./routes/patients');
var records = require('./routes/records');
var Sequelize = require("sequelize");

// security
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var session        = require('express-session');
var User           =  require('./db/passport-user');
var login           =  require('./db/login');


var mustAuthenticatedMw = function (req, res, next){
  console.log('mustAuthenticatedMw');
  req.isAuthenticated()
    ? next()
    : res.send('Must be autentificate',403);
};



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// security
app.use(session({
  secret: 'sO9hmecret'
}));
// Passport:
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password,done) {
    console.log('Strategy user=', username, 'password=' + password);
    User.findOne( username,function(err,user){
//       console.log(err);
//       console.log(user);
       if( user ) {
         if(password === user.password)
           return done(null, user)
         else
           return done(null, false, { message: 'Incorrect password.' })
      }
      else {
        return done(null, false, { message: 'Incorrect username.' });
      }
    });
}));
// теперь сериализация по username
passport.serializeUser(function(user, done) {
  console.log('serializeUser', user, user.id, user.username);
  done(null, user.username);
});


passport.deserializeUser(function(username, done) {
  console.log('deserializeUser', username);
// Здесь по имеющейся сессии ищем пользователя - если нет то ошибка!
  User.findOne(username, function(err,user){
    err
      ? done(err)
      : done(null,user);
  });

});



app.use('/', index);
app.use('/users', users);
app.use('/patients', patients);
app.use('/records', mustAuthenticatedMw, records);

// Auth system
app.post('/login',  login);
app.get('/logout',  function(req, res) {
   req.logout();
   res.send('OK');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// секция sequalize

var syncAll = require('./db/schema/createall');
// console.log(process.env);
// Создание и заполнения базы по модели производится при наличии переменной
// и если база заканчивается на _test

if( process.env.CREATEDB == 'true') {
  // console.log('Создание таблиц');
  // syncAll();
}
/*
User.findAll().then(function(users) {
  console.log('------findAll------');
  console.log(users);
})

User.findOne().then(function (user) {
   console.log('------findOne------');
   console.log(user.get('displayname'));
});
*/

module.exports = app;
