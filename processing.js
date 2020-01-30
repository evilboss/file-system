// @ts-ignore
const _ = require('lodash');
// @ts-ignore
const {uploadFile} = require('./uploader');
// @ts-ignore
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');

// @ts-ignore
const decideFileProcess = (target) => {
	return new Promise(((resolve, reject) => {
		const operation = isSupported(getFileExtension(target));
		if (operation !== 'unsupported file') {
			resolve(operation);
		} else {
			reject('unsupported file');
		}
	}))
};

// @ts-ignore
const process = (file, account) => {

	decideFileProcess(file).then(operation => {
		// @ts-ignore
		// @ts-ignore
		// @ts-ignore
		// @ts-ignore
		operation(file, account).then((payload) => {
			console.log(payload);
			if (payload && payload.filename) {

				if (payload.imaginary) {
					console.log('upload to imaginary');
				} else {
					console.log(`upload to ${payload.folder}`);
				}
				//uploadFile(payload.filename, renameFile(payload.filename, account), payload.bucket);

			}
			// @ts-ignore
		}).catch(err => {
			console.error(err)
		});
	}).catch(error => {
		console.error(error)
	});
};

/*
*  USAGE:
*  process('./testStorage/DATA_Ingestion/DOC.doc', "JLU");
*
* */


process('./testStorage/DATA_Ingestion/data.csv', "CoronaVirus");
