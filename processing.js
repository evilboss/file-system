const _ = require('lodash');

const {listAll, unpackOne} = require('./extraction');
const {convert} = require('./conversion');
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
decideFileProcess('./testStorage/DATA_Ingestion/DOC.doc');
