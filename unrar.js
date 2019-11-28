var fs = require("fs");
var unrar = require("node-unrar-js");

let buff = Uint8Array.from(fs.readFileSync('./storage/rar/Invoice.rar')).buffer;
var extractor = unrar.createExtractorFromData(buff, './storage/rar/');
let extracted = extractor.extractAll();
console.log(JSON.stringify(extracted));

