const _ = require('lodash');
const {uploadFile} = require('./uploader');
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');

const decideFileProcess = (target) => {
	return new Promise(((resolve, reject) => {
		const operation = isSupported(getFileExtension(target));
		console.log(operation);
		if (operation !== 'unsupported file') {
			resolve(operation);
		} else {
			reject('unsupported file');
		}
	}))
};

const process = (file, account) => {

	decideFileProcess(file).then(operation => {
		operation(file, account).then((payload) => {
			console.log(payload);
			if (payload && payload.filename) {
				console.log('upload to imaginary');
				//uploadFile(payload.filename, renameFile(payload.filename, account), payload.bucket);

			}
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
