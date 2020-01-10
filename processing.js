const _ = require('lodash');
const {uploadFile} = require('./uploader');
const {getFilename, getFileExtension, isSupported} = require('./filename');

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
		operation(file).then((result) => {
			console.log(result);
		}).catch(err => {
			console.error(err)
		});

	}).catch(error => {
		console.error(error)
	});
};

/*
*
*  usage
*  process('./testStorage/DATA_Ingestion/DOC.doc', "JLU");
*
* */

process('./testStorage/DATA_Ingestion/JPEG.JPG', "JLU");
uploadFile();
