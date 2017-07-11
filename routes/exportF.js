var express = require('express');
var router = express.Router();
var Record  = require('../models/Record');
var Mo  = require('../models/Mo');
var Patient  = require('../models/Patient');
var nodeExcel = require('excel-export');

/* GET users listing. */
/* GET patients listing. */
router.get('/', function(req, res, next) {
      Record.findAll({
        include: [
        { model: Mo }, // load all Mo
        { model: Patient }, // load patient
       ]}
      ).then(function(records) {
        var conf ={};
        conf.cols = [];
        console.log("ResultStart:");
        for (i = 0; i < 100; i++){
          conf.cols.push({
            caption:'string ' + i,
            captionStyleIndex: 1,
            type:'string'
          });
        }
        conf.rows = [];
        for (j = 0; j < 1000; j++){
          var row = [];
          for (k = 0; k < 100; k++){
            row.push(k);
          }
          conf.rows.push(row);
          conf.rows.push(row);
        }
        console.log("ResultBefo:");
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Large.xlsx");
        res.end(result, 'binary');      });

});


module.exports = router;
