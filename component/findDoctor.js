var db = require('../db/db');



// поиск регистровой записи пациента по СНИЛС в YR7N
// по ФИО и дате рождения (СНИЛС не выгружается из ФР7Н)
function findDoctor(rec, resultRec, callback) {
  //  console.log('Find doctor:', rec);
    db.one("SELECT * from p_vr_866 WHERE pcod=${pcod}", rec)
    .then((data) => {
//           console.log('Found doctor:', data);
           resultRec.recipe.personId = data.ss;
           callback(resultRec);
      })
    .catch(error => {
        const msg = `Error in p_vr_866:${rec.pcod} doctor not found!`;
        console.log(msg);
        resultRec.error.push(msg);
        callback(resultRec);
    });
}
module.exports = findDoctor;
