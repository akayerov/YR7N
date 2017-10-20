
// пакет xml2js не работает с атрибутами тэгов
// использовать другой пакет nkit4nodejs - который умеет работать с аттрибутами
//  npm install nkit4nodejs
var convertToF7RN = require('./convertToF7RN');



const parserRec = (rec, callback) => {
//   console.log('Record:', rec);
   // registryNumber	Уникальный номер регистровой записи пациента
   // на сегодняшний день в выгрузке из портала отсутствует код СНИЛС, который затрудняет идентификацию
   let newrec = convertToF7RN(rec, (newrec)=> {
  //   convertToXML(newrec);
      callback(newrec);
   });
// так было
//   convertToXML(newrec);
}
module.exports = parserRec;
