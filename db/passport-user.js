(function () {
  'use strict';
var db =  require('./db');

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};


module.exports.findOne = function(username, callback) {
  var err = '';
  db.oneOrNone('SELECT * FROM public.users WHERE username=$1', username)
    .then(function (data) {
//      console.log(data);
      if(data ==  null)
          err = "User not found!";
      else {
        data.password = data.password.trim();
      }
      callback(err,data);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
        callback(error,data);
    });
};

module.exports.findById = function(id, callback) {
  var err = '';
  db.oneOrNone('SELECT * FROM public.users WHERE id=$1', id)
    .then(function (data) {
//      console.log(data);
      if(data ==  null)
          err = "User not found!";
      else {
        data.password = data.password.trim();
      }
      callback(err,data);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
        callback(error,data);
    });
};

module.exports.findOrCreate = function(userYandex, callback) {
  var err = '';
//  console.log('findOrCreate', userYandex);
  db.oneOrNone('SELECT * FROM public.users WHERE username=$1', userYandex.username)
    .then(function (data) {
//      console.log(data);
      if(data ==  null) {
//         console.log("!!!", userYandex)
         db.none('INSERT INTO users(username, displayname, password) VALUES(${username},${displayname},${password})',userYandex)
          .then(() => {
              // success;
              var data = {
                username : userYandex.username,
                displayname :  userYandex.displayname,
                password  :  userYandex.password
              }
              console.log("2!!", data);
              callback(err,data);
          })
          .catch(error => {
              // error;
              callback(error,data);
          });
      }
      else {
        data.password = data.password.trim();
        callback(err,data);
      }
    })
    .catch(function (error) {
        console.log("ERROR:", error);
        callback(error,data);
    });
};


})();
