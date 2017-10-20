var db = require('../db/db');

const addRecipe = (rec, callback) => {
  console.log('addRecipe:', rec);
  const rec_in = {
      recipeid:rec['Recipeid'],
      ss:rec['Ss'],
      ds:rec['Ds'],
      c_ogrn: rec['C-Ogrn'],
      okato_reg: rec['Okato-Reg'],
      mcod: rec['Mcod'],
      pcod: rec['Pcod'],
      date_vr: rec['Date-Vr'],
      sn_lr: rec['Sn-Lr'],
      c_finl: rec['C-Finl'],
      pr_lr: rec['Pr-Lr'],
      a_cod: rec['A-Cod'],
      nom_ls: rec['nomk-ls'],
      doz_me: rec['Doz-Me'],
      c_psf: rec['C-PFS'],
      date_obr: rec['Date-Obr'],
      date_otp: rec['Date-Otp'],
      type_schet: rec['Type-Schet'],
      fo_ogrn: rec['Fo-Ogrn'],
      p_kek: rec['P-KEK'],
      d_type: rec['D-Type'],
      ko_all: rec['Ko-All'],
      sl_all: rec['Sl-All'],
      name_imy: rec['name-imy']
    };
console.log('rec_in=', rec_in);

//db.none("INSERT INTO xx_l (recipeid,ds,c_ogrn) VALUES(${recipeid},${ds}, ${c_ogrn})",rec_in)
/*
db.none("INSERT INTO xx_l (recipeid, ss, ds, c_ogrn, okato_reg, mcod, pcod, \
          date_vr,sn_lr,c_finl,pr_lr,a_cod,nom_ls,doz_me, c_psf,date_obr,date_otp,\
          type_schet,fo_ogrn,p_kek,d_type,ko_all,sl_all,name_imy \
          ) VALUES(${recipeid},${ss}, ${ds}, ${c_ogrn},${okato_reg},${mcod},${pcod},${date_vr},${sn_lr},${c_finl},${pr_lr},${a_cod},${nom_ls},${doz_me},\
         ${c_psf},${date_obr},${date_otp},${type_schet},${fo_ogrn},${p_kek},${ko_all},${sl_all},${name_imy})",rec_in)
*/
db.none("INSERT INTO xx_l (recipeid, ss, ds, c_ogrn, okato_reg, mcod, pcod, \
         date_vr,sn_lr,c_finl,pr_lr,a_cod,nom_ls,doz_me, c_psf,date_obr,date_otp,\
         type_schet,fo_ogrn,p_kek,d_type,ko_all,sl_all,name_imy \
        ) VALUES \
        (${recipeid},${ss}, ${ds}, ${c_ogrn},${okato_reg},${mcod},${pcod}, \
         ${date_vr},${sn_lr},${c_finl},${pr_lr},${a_cod},${nom_ls},${doz_me},${c_psf},${date_obr},${date_otp}, \
         ${type_schet},${fo_ogrn},${p_kek},${d_type},${ko_all},${sl_all},${name_imy} \
        )",rec_in)
  .then(() => {
      err = 'Success';
      callback(err);
  })
  .catch(error => {
      callback(error);
  });
}

module.exports = addRecipe;
