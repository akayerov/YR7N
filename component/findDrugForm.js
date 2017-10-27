var db = require('../db/db');



// поиск регистровой записи пациента по СНИЛС в YR7N
// по ФИО и дате рождения (СНИЛС не выгружается из ФР7Н)
function findDrugForm(rec, resultRec, callback) {
  //  console.log('Find doctor:', rec);
    db.one("SELECT * from p_tov WHERE nomk_ls =${nom_ls}", rec)
    .then((data) => {
//           console.log('Found doctor:', data);
           const lf =  data.c_lf;
           resultRec.recipe.vznDrugId = data.c_id_727 || '1';  //уникальный идентификатор отпущенной лекарственной формы
//           console.log("findDrugForm:lf=", lf);
           db.one("SELECT * from p_flf WHERE c_lf =${lf}",  {lf : lf})
           .then((data) => {
              resultRec.recipe.drugFormId    = data.c_id_724;
              callback(resultRec);
           })
          .catch(error => {
             const msg = `Error in p_flf:${lf} form lecarstva not found!`;
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
module.exports = findDrugForm;
