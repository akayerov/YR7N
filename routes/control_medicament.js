var express = require('express');
var router = express.Router();
var Parser = require('node-dbf');
var parserRec = require('../component/parseRecord');
var clearRecipes =  require('../component/clearRecipes')
var getRecipeList   =  require('../component/getRecipeList')
var convertToF7RN = require('../component/convertToF7RN');
var convertToXML = require('../component/convertToXML');
var _ = require('underscore')



/* GET home page. */
router.get('/', function(req, res, next) {
     res.send('Не реализовано. Размышляю, стоит ли это делать вообще по критерию затраты/эффект');
//  res.send('Формирование XML');

});

module.exports = router;
