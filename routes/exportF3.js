var express = require('express');
var router = express.Router();
var Record  = require('../models/Record');
var Mo  = require('../models/Mo');
var Patient  = require('../models/Patient');
var fs = require('fs')
var tempFile = require('tempfile');

function get_value(col) {
  if(!col) return col;
  if(col.value) return col.value;
  if(col.displayName) return col.displayName;
  if(col.name) return col.name;
  return null;
}


const workXLSX = function(arrayRec, nameOutFile) {
     console.log('Hello workXLSX');
     if(typeof require !== 'undefined') XLSX = require('xlsx');

		/* column headers */
    var sheetName =  'List1';
    var wb = XLSX.utils.book_new();
    var o = [], oo = [];
    var columns = ['id','Дата направления','Дата фактич поступления','МО','Фамилия','Имя','Отчество','Дата рождения','Город/НП','Улица','Дом','Квартира'];
    for(j = 0; j < columns.length; ++j) oo.push(columns[j]);
  	o.push(oo);

		/* aoa_to_sheet converts an array of arrays into a worksheet object */

    arrayRec.forEach(function(item, i, arrayRec) {
//      console.log( i + ": " + item);
      console.log(item.id);
      console.log(item.date_rec);
      console.log(item.dataValues.date_end);
      console.log(item.dataValues.date_fact);
      console.log(item.dataValues.state);
      console.log(item.dataValues.mo.dataValues.name);
      console.log(item.dataValues.patient.dataValues.fname);
      console.log(item.dataValues.patient.dataValues.sname);
      console.log(item.dataValues.patient.dataValues.lname);
      console.log(item.dataValues.patient.dataValues.date_b);
      console.log(item.dataValues.patient.dataValues.city);
      console.log(item.dataValues.patient.dataValues.street);
      console.log(item.dataValues.patient.dataValues.house);
      console.log(item.dataValues.patient.dataValues.kvart);


/*
      worksheet['B' + numLine ].v = item.mo.name;
      worksheet['C' + numLine ].v = item.patient.fname;
      worksheet['D' + numLine ].v = item.patient.sname;
      worksheet['E' + numLine ].v = item.patient.lname;
*/
      oo=[];
      oo.push(item.id);
      oo.push(item.date_rec);
      oo.push(item.date_end);
      oo.push(item.mo.name);
      oo.push(item.patient.lname);
      oo.push(item.patient.fname);
      oo.push(item.patient.sname);
      oo.push(item.patient.date_b);
      oo.push(item.patient.city);
      oo.push(item.patient.street);
      oo.push(item.patient.house);
      oo.push(item.patient.kvart);
      o.push(oo);
    });


    var ws = XLSX.utils.aoa_to_sheet(o);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, nameOutFile, { bookType: 'xlsx', type: 'binary' });

}


router.get('/', function(req, res, next) {
      var fName = '';
      Record.findAll({
        include: [
        { model: Mo }, // load all Mo
        { model: Patient }, // load patient
       ]}
      ).then(function(records) {
// работа с таблицей Excel
//        fName = tempFile('.xlsx');
        fName = 'res.xlsx';
        workXLSX(records,fName);
        res.download(fName);
/*
        console.log('fName=',fName);
        fs.unlink(fName, (err) => {
          if (err) throw err;
          console.log('successfully deleted tmpFile');
        });
*/
     })
    });

    router.get('/', function(req, res, next) {
       var RecScope =   Record;
       if( req.query.state) {
          if( req.query.state == '0')
            var RecScope =   Record.scope('started');
          else   if( req.query.state == '1')
            var RecScope =   Record.scope('ended');
       }

    //  Record.scope('started').findAll({
       if( req.user.role == 0) {
           RecScope.findAll({
             where: {
               moId :  req.user.moId
             },
             include: [
             { model: Mo }, // load all Mo
             { model: Patient }, // load patient
            ]}
           ).then(function(records) {
//              res.send(records);
              // работа с таблицей Excel
              //        fName = tempFile('.xlsx');
                      fName = 'res.xlsx';
                      workXLSX(records,fName);
                      res.download(fName);
              /*
                      console.log('fName=',fName);
                      fs.unlink(fName, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted tmpFile');
                      });
              */
          });
        }
        else {
          RecScope.findAll({
            include: [
            { model: Mo }, // load all Mo
            { model: Patient }, // load patient
           ]}
          ).then(function(records) {
//             res.send(records);
             // работа с таблицей Excel
             //        fName = tempFile('.xlsx');
                     fName = 'res.xlsx';
                     workXLSX(records,fName);
                     res.download(fName);
             /*
                     console.log('fName=',fName);
                     fs.unlink(fName, (err) => {
                       if (err) throw err;
                       console.log('successfully deleted tmpFile');
                     });
             */
       });

        }
    });


    module.exports = router;
