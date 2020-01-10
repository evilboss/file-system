const _ = require('lodash');
const {uploadFile} = require('./uploader');
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');

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
const process = (file, account) => {
	decideFileProcess(file).then(operation => {
		operation(file).then((payload) => {
			if (payload.filename) {
				uploadFile(payload.filename, renameFile(payload.filename, account), payload.bucket);
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

process('./testStorage/DATA_Ingestion/RTF.rtf', "JLU");
