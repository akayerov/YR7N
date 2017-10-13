var db = require('../db/db');

const clearRecipes = (callback) => {
  console.log('clearRecipes:');
  db.none('DELETE FROM xx_l')
  .then(() => {
      err = 'Success';
      callback(err);
  })
  .catch(error => {
      callback(error);
  });

}

module.exports = clearRecipes;
