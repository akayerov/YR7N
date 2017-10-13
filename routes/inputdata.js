var express = require('express');
var router = express.Router();
var Parser = require('node-dbf');
var parserRec = require('../component/parseRecord');
var clearRecipes =  require('../component/clearRecipes')
var addRecipe   =  require('../component/addRecipe')


const workDBF = () => {
    console.log('Work witch DBF table');

  var parser = new Parser('./xx_L_1.dbf');

  parser.on('start', function(p) {
      console.log('dBase file parsing has started');
  });

  parser.on('header', function(h) {
      console.log('dBase file header has been parsed');
  });

  let count_rec=0;
  parser.on('record', function(record) {
    //      console.log(record.Ss + ":" + record['C-Ogrn']); // Name: John Smith
        if(!count_rec++) {
//          console.log(record); // Name: John Smith
          parserRec(record);
          addRecipe(record,function(mess) {
                             console.log('add Message=', mess);
          })
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
  workDBF();
  res.send('Обработка входных данных');
});

module.exports = router;
