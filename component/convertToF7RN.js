var findPatient = require('./findPatient');
var findDoctor =  require('./findDoctor');
var findMNN    =  require('./findMNN');
var findMO     =  require('./findMO');
function convertToF7RN(rec, callback) {
/*
  let newrec = rec;
  delete newrec['@deleted'];
  delete newrec['@sequenceNumber'];
  delete newrec['Error_'];
*/
  console.log('convertToF7RN:rec:', rec);
  let sn_lr = rec.sn_lr.split(' ');
  let date_vr = rec.date_vr.toISOString().substr(0,10);
  console.log('date_vr:', date_vr);
  let resultRec  = {
    error:[],
    registryNumber:'0',
    recipe : {
      recipeSerial:sn_lr[0],
      recipeNumber:sn_lr[1],
      issueDate: date_vr,
      issueDosageId:0,       // код справочника дозировок
      doseCount:0,           //количество выписанных доз
      personId:'0',          // СНИЛС врача, выписавшего рецепт
      desease:rec.ds,        // диагноз МКБ-10
      mnnId:'0',             // МНН выписаного лекарственного стредства
      moId :'0',             // Код OID медицинской организации, выписавшей рецепт
    }
  }

//  test('Smit', resultRec);
  const num_paralell_func = 4;
  let i=0;
  findPatient(rec, resultRec, (resultRec)=>{
    if(++i == num_paralell_func)
      callback(resultRec);
  });
  findDoctor(rec, resultRec, (resultRec)=>{
    if(++i == num_paralell_func)
      callback(resultRec);
  });
  findMNN(rec, resultRec, (resultRec)=>{
    if(++i == num_paralell_func)
      callback(resultRec);
  });
  findMO(rec, resultRec, (resultRec)=>{
    if(++i == num_paralell_func)
      callback(resultRec);
  });
  return resultRec;
}
module.exports = convertToF7RN;
