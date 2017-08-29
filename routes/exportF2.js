var express = require('express');
var router = express.Router();
var Record  = require('../models/Record');
var Mo  = require('../models/Mo');
var Patient  = require('../models/Patient');
var fs = require('fs')
var tempFile = require('tempfile');

const workXLSX = function(arrayRec,nameInFile, nameOutFile) {
     console.log('Hello workXLSX');
     if(typeof require !== 'undefined') XLSX = require('xlsx');
     var workbook = XLSX.readFile(nameInFile);
//     console.log('workbook=',workbook);
     var first_sheet_name = workbook.SheetNames[0];
     var address_of_cell = 'A1';

     /* Get worksheet */
     var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
     var desired_cell = worksheet[address_of_cell];


/* Get the value */
     var desired_value = (desired_cell ? desired_cell.v : undefined);
    console.log('desired_value(A1)',desired_value);
    console.log('desired_value(A2)',worksheet['A2'].v);
    console.log('desired_value(A3)',worksheet['A3'].v);

    worksheet['A2'].v = 4;
    worksheet['A3'].v = 7;
    /* output format determined by filename */
    let numLine = 2;
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
      console.log('1:numLine=',numLine);
      worksheet['A' + numLine ].v = item.id;
/*
      worksheet['B' + numLine ].v = item.mo.name;
      worksheet['C' + numLine ].v = item.patient.fname;
      worksheet['D' + numLine ].v = item.patient.sname;
      worksheet['E' + numLine ].v = item.patient.lname;
*/
      numLine++;
      console.log('2:numLine=',numLine);
    });

    XLSX.writeFile(workbook, nameOutFile);
//    var j = XLSX.utils.sheet_to_json(worksheet, {header:1});
//    console.log('JSON',j);

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
        fName = tempFile('.xlsx');
        workXLSX(records,'test.xlsx',fName);
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


module.exports = router;
