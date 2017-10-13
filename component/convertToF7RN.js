function fillPatient(rec) {
   rec.registryNumber = '99999999';
}

function convertToF7RN(rec) {
/*
  let newrec = rec;
  delete newrec['@deleted'];
  delete newrec['@sequenceNumber'];
  delete newrec['Error_'];
*/
  let newrec  = {
    registryNumber:'0110817000759',
    recipe : {
      recipeSerial:'790',
      recipeNumber:'149753'
    }
  }

  fillPatient(newrec);
  return newrec;
}
module.exports = convertToF7RN;
