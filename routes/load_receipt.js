var express = require('express');
var router = express.Router();
var Parser = require('node-dbf');
var parserRec = require('../component/parseRecord');
var clearRecipes =  require('../component/clearRecipes')
var addRecipe   =  require('../component/addRecipe')
const limitNumReceipts = 10000;

const workDBF = (nameFile, period) => {
    console.log('Work witch DBF table',nameFile);

//  var parser = new Parser('./xx_L_1.dbf');
  var parser = new Parser(nameFile);

  parser.on('start', function(p) {
      console.log('dBase file parsing has started');
  });

  parser.on('header', function(h) {
      console.log('dBase file header has been parsed');
  });

  let count_rec = 0;

  parser.on('record', function(record) {
    //      console.log(record.Ss + ":" + record['C-Ogrn']); // Name: John Smith
       console.log('workDBF:',record); // Name: John Smith

       console.log('workDBF:date_otp',record['Date-Otp']); // Name: John Smith
       let date_otp  = record['Date-Otp'].substr(0,4) + '-'  +
                       record['Date-Otp'].substr(4,2)  + '-' +
                       record['Date-Otp'].substr(6,2);
//      console.log('Period=', period);
//      console.log('date_otp=', date_otp);
       if( period.date_b <= date_otp && period.date_e >= date_otp ) {
        if(count_rec++ < limitNumReceipts) {
          if( period.date_b <= date_otp && period.date_e >= date_otp ) {
            console.log('ADD');
            addRecipe(record,function(mess) {
                               console.log('add Message=', mess);
            })
          }
        }
       }

  });

  parser.on('end', function(p) {
      console.log('Finished parsing the dBase file');
  });
 clearRecipes(function(mess) {
                 console.log('clearRecipes Message=', mess);
              }
 );
 parser.parse();
}
/* GET home page. */
router.get('/', function(req, res, next) {
  let period = { date_b: req.query.idate_b, date_e: req.query.idate_e };
  let nameFile = req.query.nameFile;
  if( nameFile) {
     workDBF(nameFile,period);
     res.send('Загрузка исходных данных');
  }
  else {
    res.send('Файл не выбран');
  }
});

module.exports = router;
