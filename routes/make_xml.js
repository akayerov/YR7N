var express = require('express');
var router = express.Router();
var Parser = require('node-dbf');
var parserRec = require('../component/parseRecord');
var clearRecipes =  require('../component/clearRecipes')
var getRecipeList   =  require('../component/getRecipeList')
var convertToF7RN = require('../component/convertToF7RN');
var convertToXML = require('../component/convertToXML');

const makeArrObj = (arr_res, callback) => {
//    console.log('Make XML file for FR7N');
    getRecipeList((data,err)=>{
//      console.log('Done:data=',data);
//      console.log('Done:err=',err);
      if(data) {
         let i = 0;
         for( rec of data) {
           let resObj = {};
//           console.log('FOR Rec:',rec);
           parserRec(rec,(newrec)=>{
//              console.log('arr_res:',arr_res);
              arr_res.push(newrec);
              if(++i == data.length)
                callback(arr_res);
           });
         }
      }

    })

}
/* GET home page. */
router.get('/', function(req, res, next) {
  let arr_res = [];
  makeArrObj(arr_res, (arr_res)=>{
     console.log('RESULT DATA',arr_res );
     let xml = convertToXML(arr_res);
     const num_err = 1;
     res.send(`Формирование XML:ошибок - ${num_err}`);
  });
//  res.send('Формирование XML');

});

module.exports = router;
