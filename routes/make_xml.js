var express = require('express');
var router = express.Router();
var Parser = require('node-dbf');
var parserRec = require('../component/parseRecord');
var clearRecipes =  require('../component/clearRecipes')
var getRecipeList   =  require('../component/getRecipeList')
var convertToF7RN = require('../component/convertToF7RN');
var convertToXML = require('../component/convertToXML');
var _ = require('underscore')

const makeArrObj = (period, arr_res, callback) => {
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

    }, period)

}

const saveToFile = (nameFile,xml) => {
  const fs = require('fs');
  fs.writeFile(nameFile, xml, (err) => {
   if (err) throw err;
   console.log('The file has been saved!');
   var archiver = require('archiver');
   var output = fs.createWriteStream('./result.zip');
   var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
   });
   output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
   })
   archive.pipe(output);
   archive.file(nameFile, { name: nameFile });
   archive.finalize();
   console.log('The ZIP file has been saved!:');

 });

}



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.params:',req.params);
  console.log('req.query:',req.query);

  let arr_res = [];
  let period = { date_b: req.query.date_b, date_e: req.query.date_e };

    makeArrObj(period, arr_res, (arr_res)=>{
//     console.log('RESULT DATA',arr_res );
     let arr_err = _.filter(arr_res, (num)=>{ return num.error.length != 0 });
         arr_err = _.map(arr_err, (num)=>{ return num.error });
         arr_err =_.flatten(arr_err);
//         arr_err = _.union(arr_err);
         arr_err = _.uniq(arr_err);
     console.log('END WORK DATA');
     console.log('ERROR DATA',arr_err );
     let numReceipt = 0;
//     if(_.size(arr_err) == 0) {
     if(_.size(arr_err) != 0) {
  //  конвертация массива объектов в XML файл
       let arr = arr_res.map((obj)=> {
          delete obj.error;
          return obj;
       })
       numReceipt = _.size(arr);
       let xml = convertToXML(arr);
       console.log('RESULT XML',xml );
       saveToFile('export_rec.xml',xml);

     }
     const num_err = _.size(arr_err);

     res.render('resultOperation', {res : { title: 'Формирование XML файлов для ФР7Н',
                           numError: num_err ,
                           numReceipt: numReceipt,
                           errors:arr_err}});
  });
//  res.send('Формирование XML');

});

module.exports = router;
