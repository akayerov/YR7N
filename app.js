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
var record  = require('./routes/record');
var recordFull  = require('./routes/recordFull');
var exportF  = require('./routes/exportF');

var whoami = require('./routes/whoami');
var sessions = require('./routes/sessions');
var Sequelize = require("sequelize");

// security
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var session        = require('express-session');
var User           =  require('./db/passport-user');
//var login          =  require('./db/login');
var login          =  require('./db/loginMy');

var cors           =  require('cors');
// kir
var JwtCtrl = require('./controllers/jwt.controller');

// хэширование паролей
/*
var SHA256 = require("crypto-js/sha256");
console.log('1:',SHA256("Open text"));

var obj = SHA256("Open text").toString();
console.log('2:',obj);
var s = JSON.stringify(obj);
console.log(s);
*/

var mustAuthenticatedMw = function (req, res, next){
  console.log('mustAuthenticatedMw');
  req.isAuthenticated()
    ? next()
//    : res.send('Must be autentificate',403);
    : res.status(403).send({state:0, info: { err: 'Must be autentificate'}});

};
var mustAuthenticatedJWT = function (req, res, next){
  console.log('mustAuthenticatedJWT');

  req.isAuthenticated()
    ? next()
//    : res.send('Must be autentificate',403);
    : res.status(403).send({state:0, info: { err: 'Must be autentificate'}});

};

var app = express();

app.use(cors());
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
  secret: 'sO9hmecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
   httpOnly: false
 }

}));
// Passport:
app.use(passport.initialize());
app.use(passport.session());


passport.use(JwtCtrl.jwtStrategy);
/*
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
           return done(null, false, { message: 'Incorrect username or password.' })
      }
      else {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    });
}));
*/
// теперь сериализация по username
passport.serializeUser(function(user, done) {
  console.log('serializeUser', user, user.id, user.username, user.moId);
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
// попытка избавиться от формирования ответов 304
// работает! без этого нрестабильно работал refresh после удаления
//https://stackoverflow.com/questions/14641308/how-to-totally-prevent-http-304-responses-in-connect-express-static-middleware
// выключение etag работает, однаок возможно пролблема была в несинхронности посылки данных из-за неправильного использования промисов в процедере удаления объектов
//app.disable('etag');

app.use('/', index);
app.use('/users', users);
app.use('/patients', patients);
app.use('/sessions', sessions);
//app.use('/records', mustAuthenticatedMw, records);
//app.use('/whoami', mustAuthenticatedMw, whoami);
app.use('/record', passport.authenticate('jwt', { session: false }), record);
app.use('/recordf', passport.authenticate('jwt', { session: false }), recordFull);
app.use('/records', passport.authenticate('jwt', { session: false }), records);
app.use('/export', passport.authenticate('jwt', { session: false }), exportF);
app.use('/private', passport.authenticate('jwt', { session: false }), function (req, res) {
  console.log(req);
  res.json({ success: true, result: [{ id: '01', name: 'Apple' },  { id: '02', name: 'Orange' }] })
})

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

 console.log(process.env);
// Создание и заполнения базы по модели производится при наличии переменной
// и если база заканчивается на _test
var syncAll = require('./db/schema/createall');

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
