
// пакет xml2js не работает с атрибутами тэгов
// использовать другой пакет nkit4nodejs - который умеет работать с аттрибутами
//  npm install nkit4nodejs
var convertToF7RN = require('./convertToF7RN');

const convertToXML = (rec) => {
  var fs = require('fs'),
  xml2js = require('xml2js');

//  var obj = {name: "Super", Surname: "Man", age: 23};
  var obj = rec;

  var builder = new xml2js.Builder({rootName:'records'});
  var xml = builder.buildObject(obj);
  console.log('XML:', xml);
}

const parserRec = (rec) => {
   console.log('Record:', rec);
   // registryNumber	Уникальный номер регистровой записи пациента
   // на сегодняшний день в выгрузке из портала отсутствует код СНИЛС, который затрудняет идентификацию
   let newrec = convertToF7RN(rec);
   convertToXML(newrec);
}
module.exports = parserRec;
