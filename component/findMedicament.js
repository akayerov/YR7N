var db = require('../db/db');



// поиск регистровой записи пациента по СНИЛС в YR7N
// по ФИО и дате рождения (СНИЛС не выгружается из ФР7Н)
function findMedicament(rec, resultRec, callback) {
  //  console.log('Find doctor:', rec);
    db.one("SELECT * from p_tov WHERE nomk_ls =${nom_ls}", rec)
    .then((data) => {
          console.log('Found Medicament:', data);
          resultRec.recipe.mnnId   = data.id_723 || '0';
          resultRec.recipe.issueDosageId   = data.id_722 || '0';
          resultRec.recipe.drugFormId    = data.id_724 || '0';
          resultRec.recipe.dosageId    = data.id_722 || '0';
          resultRec.recipe.dosageCountId     = data.id_728 || '0';
          resultRec.recipe.vznDrugId      = data.id_727 || '0';
          callback(resultRec);
      })
    .catch(error => {
        const msg = `Error in p_tov:${rec.nom_ls} cod Medicament not found!`;
        console.log(msg);
        resultRec.error.push(msg);
        callback(resultRec);
    });
}
module.exports = findMedicament;
