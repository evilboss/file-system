const StreamZip = require('node-stream-zip');
const fs = require('fs');
const zip = new StreamZip({
	file: './storage/zip/ZIP.zip',
	storeEntries: true
});


zip.on('error', err => {
	console.log(err)
});

zip.on('ready', () => {
	console.log('Entries read: ' + zip.entriesCount);
	fs.mkdirSync('./storage/extracted');
	zip.extract(null, './storage/extracted', (err, count) => {
		console.log(err ? 'Extract error' : `Extracted ${count} entries`);
		zip.close();
	});

	// Do not forget to close the file once you're done
	zip.close()
});
zip.on('extract', (entry, file) => {
	console.log(`Extracted ${entry.name} to ${file}`);
});
