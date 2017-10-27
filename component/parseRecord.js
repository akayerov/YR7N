var convertToF7RN = require('./convertToF7RN');



const parserRec = (rec, callback) => {
//   console.log('Record:', rec);
   // registryNumber	Уникальный номер регистровой записи пациента
   // на сегодняшний день в выгрузке из портала отсутствует код СНИЛС, который затрудняет идентификацию
   let newrec = convertToF7RN(rec, (newrec)=> {
      callback(newrec);
   });
}
module.exports = parserRec;
