
// пакет xml2js не работает с атрибутами тэгов
// использовать другой пакет nkit4nodejs - который умеет работать с аттрибутами
//  npm install nkit4nodejs - ставится с ошибкой - не устанавливается
// пробую другие паукеты формирующие xml2js
// objet-to-xml  - сложный синтаксис
// jstoxml - проблема при установке
// xml - непонятные ошибки в коде примера, нужны дополнительные усидлия для формирования результата
// xmlbuilder

const convertToXML_xml2js = (rec) => {
//  var fs = require('fs'),
  xml2js = require('xml2js');

//  var obj = {name: "Super", Surname: "Man", age: 23};
  var obj = rec;

  var builder = new xml2js.Builder({rootName:'records'});
  var xml = builder.buildObject(obj);
//  console.log('XML:', xml);
  return xml;
}


// непонятные ошибки в коде примера

const convertToXML_xml = (rec) => {
  console.log('XML: convert:', rec);

  var xml = require('xml');
  var elem = xml.element({ _attr: { decade: '80s', locale: 'US'} });
  var stream = xml({ toys: elem }, { stream: true });
  stream.on('data', function (chunk) {console.log("data:", chunk)});
  elem.push({ toy: 'Transformers' });
  elem.push({ toy: 'GI Joe' });
  elem.push({ toy: [{name:'He-man'}] });
  elem.close();

//  console.log('Result=', stream);

  return result;
}

const convertToXML_xmlbuilder = (rec) => {
  console.log('XML: convert:', rec);

  var builder = require('xmlbuilder');
  var _ =  require('underscore');
  var root = builder.create('records',{ encoding: 'utf-8' });
/*
  for(var i = 1; i <= 5; i++) {
    var item = createVznRecipe.ele('createVznRecipe');
  }
*/
  _.each(rec, (el) => {
    var record = root.ele('record');
    record.att('type','create');
    var createVznRecipe = record.ele('createVznRecipe');
    var registryNumber = createVznRecipe.ele('registryNumber', el.registryNumber);

    var recipe = createVznRecipe.ele('recipe');
    var recipeSerial = recipe.ele('recipeSerial',el.recipe.recipeSerial);
    var recipeNumber = recipe.ele('recipeNumber',el.recipe.recipeNumber);
    var issueDate = recipe.ele('issueDate',el.recipe.issueDate);

    var deliveryDate = recipe.ele('deliveryDate',el.recipe.deliveryDate);
    var issueDosageId  = recipe.ele('issueDosageId');
        issueDosageId.att('id',el.recipe.issueDosageId);

    var doseCount = recipe.ele('doseCount',el.recipe.doseCount);
    var dosageId  = recipe.ele('dosageId');
        dosageId.att('id',el.recipe.dosageId );

    var doseInPack = recipe.ele('doseInPack',el.recipe.doseInPack);
    var packCount = recipe.ele('packCount',el.recipe.packCount);

    var personId = recipe.ele('personId',el.recipe.personId);
    var desease = recipe.ele('desease',el.recipe.desease);

    var mnnId  = recipe.ele('mnnId');
        mnnId.att('id',el.recipe.mnnId );
    var moId = recipe.ele('moId',el.recipe.moId);

    var pharmacyId = recipe.ele('pharmacyId',el.recipe.pharmacyId);

    var vznDrugId  = recipe.ele('vznDrugId');
        vznDrugId.att('id',el.recipe.vznDrugId );

    var drugFormId  = recipe.ele('drugFormId' );
        drugFormId.att('id',el.recipe.drugFormId);

    var recipeOperationId  = recipe.ele('recipeOperationId');
        recipeOperationId.att('id',el.recipe.recipeOperationId );

    var territoryId  = recipe.ele('territoryId');
        territoryId.att('id',el.recipe.territoryId );

    var signedPerson = recipe.ele('signedPerson',el.recipe.signedPerson);
    var isTheraphyResistence = recipe.ele('isTheraphyResistence',el.recipe.isTheraphyResistence);

  })
  //console.log(root.end({ pretty: true }));

  return root.end({ pretty: true })
}



// module.exports = convertToXML_xml2js;
//module.exports = convertToXML_xml;
module.exports = convertToXML_xmlbuilder;
