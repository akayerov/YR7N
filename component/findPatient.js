var db = require('../db/db');
var dateDMY = require('../util/dateDMY');

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};


// поиск регистровой записи пациента по СНИЛС в YR7N
// по ФИО и дате рождения (СНИЛС не выгружается из ФР7Н)
function findPatient(rec, resultRec, callback) {

//    console.log('fillPatient:', rec);
//    console.log('resultRec:', resultRec);
//  поиск ФИО и даты рождения 008-961-011 46
//    db.oneOrNone("SELECT * from xx_p WHERE ss=${ss}", rec)

//    console.log("BEFORE FOUND rec.ss=", rec.ss);
//    db.oneOrNone("SELECT * from xx_p WHERE ss='008-961-011 46'", rec)
    db.one("SELECT * from xx_p WHERE ss=${ss}", rec)
    .then((data) => {
//      console.log("FOUND IN xx_p:", data);
      const fio = data.fam.trim() + ' ' + data.im.trim() + ' ' + data.ot.trim();
//      console.log(fio);
//      console.log(data.dr);
      const findDateB = dateDMY(data.dr).substr(0,10);
//      console.log('RES:',findDateB);
      db.many("SELECT * from registry_7vzn WHERE fio = ${fio} and LEFT(date_bd,10) = ${dateb}", {fio:fio, dateb:findDateB})
      .then((data) => {
         if(data.length > 1) {
           const msg = `Error in FR7N:${fio} ${findDateB} have more thne one patient`;
           console.log(msg);
           resultRec.error.push(msg);
           callback(resultRec);
         }
         else {
//           console.log("Registry_7vzn  found patient:", data );
           resultRec.registryNumber = data[0].unrz;
           callback(resultRec);
         }
      })
      .catch(error => {
        const msg = `Error in FR7N:${fio} ${findDateB} patiient not found!`;
        console.log(msg);
        resultRec.error.push(msg);
        callback(resultRec);
      });


    })
    .catch(error => {
      const msg = `Error in PINGVIN: СНИЛС=${rec.ss} not exist in table xx_p`;
      console.log(msg);
      resultRec.error.push(msg);
      callback(resultRec);
    });

}
module.exports = findPatient;
