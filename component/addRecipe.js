var db = require('../db/db');

const addRecipe = (rec, callback) => {
  console.log('addRecipe:', rec);
  console.log('clearRecipes:');
  let rec_in = {recid:'123321', ss:'123:123:543'};
/*
  db.none(`INSERT INTO xx_l (recipeid,
                             ss,
                             c_ogrn,
                             okato_reg,
                             mcod,
                             pcod,
                             ds,
                             date_vr,
                             sn_lr,
                             c_finl,
                             pr_lr,
                             a_cod,
                             nom_ls,
                             doz_me,
                             c_psf,
                             date_obr,
                             date_otp,
                             type_schet,
                             fo_ogrn,
                             p_kek,
                             d_type,
                             ko_all,
                             sl_all,
                             name_imy) VALUES(
                             ${Recipeid},
                             ${Ss},
                             ${'Okato-Reg'},
                             ${'C-Ogrn'},
                             ${ss},
                             ${ss},
                             )`,rec)
*/
db.none("INSERT INTO xx_l (recipeid,ss,okato_reg,c_ogrn) VALUES(${Recipeid},${Ss},${Okato-Reg},${C-Ogrn})",rec)
  .then(() => {
      err = 'Success';
      callback(err);
  })
  .catch(error => {
      callback(error);
  });
}

module.exports = addRecipe;
