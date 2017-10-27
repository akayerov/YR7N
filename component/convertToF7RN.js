var findPatient = require('./findPatient');
var findDoctor =  require('./findDoctor');
var findMNN    =  require('./findMNN');
var findMO     =  require('./findMO');
var findDrugForm    =  require('./findDrugForm');
var dateYMD = require('../util/dateYMD');

function convertToF7RN(rec, callback) {
/*
  let newrec = rec;
  delete newrec['@deleted'];
  delete newrec['@sequenceNumber'];
  delete newrec['Error_'];
*/
  console.log('convertToF7RN:rec:', rec);
  let sn_lr = rec.sn_lr.split(' ');
  let resultRec  = {
    error:[],
    registryNumber:'0',
    recipe : {
      recipeSerial:sn_lr[0],
      recipeNumber:sn_lr[1],
      issueDate: dateYMD(rec.date_vr), // дата выписки рецепта
      issueDosageId:0,       // код справочника дозировок
      doseCount:rec.doz_me * rec.ko_all,    //количество выписанных доз
      personId:'0',          // СНИЛС врача, выписавшего рецепт
      desease:rec.ds,        // диагноз МКБ-10
      mnnId:'0',             // МНН выписаного лекарственного стредства
      moId :'0',             // Код OID медицинской организации, выписавшей рецепт
      drugFormId:'0',         //Уникальный идентификатор лекарственной формы
      isTheraphyResistence:false, //Резистентность к терапии по указанному препарату
      territoryId :78,       //Уникальный идентификатор Субъекта Российской Федерации
      deliveryDate:dateYMD(rec.date_otp), //Дата отпуска препарата по рецепту
      dosageId:'0',          //Уникальный идентификатор отпущенной дозы
      doseInPack:'0',        //Уникальный идентификатор количества доз в упаковке
      packCount :rec.ko_all, //Количество отпущенных упаковок
      pharmacyId : '1.2.643.5.1.13.13.12.3.76.718',  //Код аптечной организации
      vznDrugId :'1',          // Уникальный идентификатор отпущенного лекарственного препарата
      signedPerson:'',        //Руководитель, подписавший карточку
      recipeOperationId:'2'   // предположительно означает: добавить запись - 2, изменить запись - 3    
    }
  }

//  test('Smit', resultRec);
  const num_paralell_func = 5;
  let ii=0;
  findPatient(rec, resultRec, (resultRec)=>{
    if(++ii == num_paralell_func)
      callback(resultRec);
  });
  findDoctor(rec, resultRec, (resultRec)=>{
    if(++ii == num_paralell_func)
      callback(resultRec);
  });
  findMNN(rec, resultRec, (resultRec)=>{
    if(++ii == num_paralell_func)
      callback(resultRec);
  });
  findMO(rec, resultRec, (resultRec)=>{
    if(++ii == num_paralell_func)
      callback(resultRec);
  });
  findDrugForm(rec, resultRec, (resultRec)=>{
    if(++ii == num_paralell_func)
      callback(resultRec);
  });

//  return resultRec;
}
module.exports = convertToF7RN;
