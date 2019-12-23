const libre = require('libreoffice-convert');

const path = require('path');
const fs = require('fs');

const extend = '.pdf';

// Read filelet enterPath =  './testStorage/DATA_Ingestion/DOC.doc';
// const outputPath = `./testStorage/DATA_Ingestion/converted/doc${extend}`;
enterPath = fs.readFileSync('./testStorage/DATA_Ingestion/XML.xml');
// Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
libre.convert(enterPath, extend, undefined, (err, done) => {
	if (err) {

		console.log(`Error converting file: ${err}`);
	} else {
		fs.writeFileSync(`./testStorage/converted/doc${extend}`, done);

	}
	// Here in done you have pdf file which you can save or transfer in another stream
});
