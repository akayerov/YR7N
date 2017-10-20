const convertToXML = (rec) => {
  var fs = require('fs'),
  xml2js = require('xml2js');

//  var obj = {name: "Super", Surname: "Man", age: 23};
  var obj = rec;

  var builder = new xml2js.Builder({rootName:'records'});
  var xml = builder.buildObject(obj);
  console.log('XML:', xml);
  return xml;
}
module.exports = convertToXML;
