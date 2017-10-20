var db = require('../db/db');



// поиск регистровой записи пациента по СНИЛС в YR7N
// по ФИО и дате рождения (СНИЛС не выгружается из ФР7Н)
function findMNN(rec, resultRec, callback) {
  //  console.log('Find doctor:', rec);
    db.one("SELECT * from p_tov WHERE nomk_ls =${nom_ls}", rec)
    .then((data) => {
//           console.log('Found doctor:', data);
           const mnn =  data.c_mnn;
           db.one("SELECT * from p_mnn WHERE c_mnn =${mnn}",  {mnn : mnn})
           .then((data) => {
              resultRec.recipe.mnnId   = data.c_mnn_723;
              callback(resultRec);
           })
          .catch(error => {
             const msg = `Error in p_mnn:${mnn} mnn cod lecarstva not found!`;
             console.log(msg);
             resultRec.error.push(msg);
             callback(resultRec);
          });
      })
    .catch(error => {
        const msg = `Error in p_tov:${rec.nom_ls} cod lecarstva not found!`;
        console.log(msg);
        resultRec.error.push(msg);
        callback(resultRec);
    });
}
module.exports = findMNN;
