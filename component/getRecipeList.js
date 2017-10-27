var db = require('../db/db');

const getRecipeList = (callback, period) => {
  console.log('getRecipeList:', period);

//  db.manyOrNone("SELECT rec.* from xx_l rec WHERE rec.date_otp >= #{date_b} and rec.date_otp <= #{date_e}", period)
//  db.manyOrNone("SELECT rec.* from xx_l rec")
//  db.manyOrNone("SELECT rec.* from xx_l rec WHERE rec.date_otp >= '2017-07-01' and rec.date_otp <= '2017-07-13'")
  db.manyOrNone("SELECT rec.* from xx_l rec WHERE rec.date_otp >= ${date_b} and rec.date_otp <= ${date_e}", period)
  .then((data) => {
      callback(data,"Success");
  })
  .catch(error => {
      callback(null,error);
  });
}

module.exports = getRecipeList;
