const _ = require('lodash');

const {listAll, unpackOne} = require('./extraction');
const {convert} = require('./conversion');
const {getFilename, getFileExtension} = require('./filename');
const {supportedFileFormats, supportedArchives} = require('./supportedfiles.json');

const isSupported = (ext) => {
	/*TODO: return don't convert if files are [jpg, psd,png,pdf]*/
	const defaultFormats = ['jpg', 'psd', 'png', 'pdf'];
	return (_.includes(supportedArchives, ext)) ?
		getOperation('extract') :
		(_.includes(supportedFileFormats, ext)) ?
			(_.includes(defaultFormats, ext)) ?
				getOperation('dontConvert') :
				getOperation('convert', ext) :
			getOperation('unsupported');
};

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
