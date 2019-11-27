var fs = require("fs");
var unrar = require("node-unrar-js");

var buf = Uint8Array.from(fs.readFileSync("a.rar")).buffer;
var extractor = unrar.createExtractorFromData(buf);

var extracted = extractor.extractAll();
