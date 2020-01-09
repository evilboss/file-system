const _ = require('lodash');

const {listAll, unpackOne} = require('./extraction');
const {convert} = require('./conversion');
const {getFilename, getFileExtension, isSupported} = require('./filename');

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
		operation(file).then((result) => {
			console.log(result);
		}).catch(err => {
			console.error(err)
		});

	}).catch(error => {
		console.error(error)
	});
};

process('./testStorage/DATA_Ingestion/DOC.doc', "JLU");
