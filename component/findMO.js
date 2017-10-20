var db = require('../db/db');



// поиск регистровой записи пациента по СНИЛС в YR7N
// по ФИО и дате рождения (СНИЛС не выгружается из ФР7Н)
function findMO(rec, resultRec, callback) {
  //  console.log('Find doctor:', rec);
    db.one("SELECT * from mo WHERE ogrn =${c_ogrn}", rec)
    .then((data) => {
        resultRec.recipe.moId    = data.OID ;
        callback(resultRec);
      })
    .catch(error => {
        const msg = `Error in mo:${rec.c_ogrn} MO not found!`;
        console.log(msg);
        resultRec.error.push(msg);
        callback(resultRec);
    });
}
module.exports = findMO;
