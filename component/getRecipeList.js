var db = require('../db/db');

const getRecipeList = (callback) => {
//  console.log('getRecipeList:');
  db.manyOrNone("SELECT * from xx_l")
  .then((data) => {
      callback(data,"Success");
  })
  .catch(error => {
      callback(null,error);
  });
}

module.exports = getRecipeList;
