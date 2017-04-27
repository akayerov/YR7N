// obiects
var User = require('../../models/User');
var Mo   = require('../../models/Mo');
var Patient  = require('../../models/Patient');
var Record   = require('../../models/Record');

var users = require('./data/users');
var mos =  require('./data/mos');
var patients =  require('./data/patients');
var records =  require('./data/records');


var sequelize = require('../connection');
var Sequelize = require("sequelize");


var userFill = function()  {
  console.log('User fill data');
  users.forEach(function(item, i, users) {
    User.create({
        username: item.username,
        displayname: item.displayname,
        moId: item.moId,
        role: item.role,
      });
  });
}


var moFill = function( mode = { force : true } )  {
   console.log(mode);
   var moarr = JSON.parse(mos);
   moarr.forEach(function(item, i, users) {
     Mo.create({
         name: item.name,
         ogrn: item.ogrn
       });
   });
}
var moFill2 = function( mode = { force : true } )  {
  console.log(mode);
   var moarr = JSON.parse(mos);

   Mo.bulkCreate(moarr).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
     console.log('...All fill2!.....')
     return Mo.findAll();
   }).then(function(mo) {
//     console.log(mo) // ... in order to get the array of user objects
   })
}
// универсальный в отличие от выше заливщик данынх
var uniFill = function( arrobj, ModelObj,  mode = { force : true } )  {
  console.log(mode);
   ModelObj.bulkCreate(arrobj).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
     console.log('...All Unifill!.....')
     return ModelObj.findAll();
   }).then(function(obj) {
//     console.log(mo) // ... in order to get the array of user objects
   })
}




var syncAll = function() {
  var time1 = 10000;
  var time2 = 15000;
       console.log('All sync');
// отношения установить
       User.belongsTo(Mo);
       Record.belongsTo(Patient);
       Record.belongsTo(Mo);
// создать все таблицы целиком
       sequelize.sync(mode = { force: true, match: /_test$/ }).then(function () {
          console.log('create All!');
//          moFill();
            moFill2();
            console.log(res);
       });
// Как сделать правильно не придумал, пока через задержку
       setTimeout(userFill, time1);
       setTimeout(function () {
                    uniFill(patients,Patient);
                 }, time1);
       setTimeout(function () {
                    uniFill(records,Record);
                 }, time2);


};


module.exports = syncAll;
