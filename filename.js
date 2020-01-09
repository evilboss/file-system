const _ = require('lodash');
const {supportedFileFormats, supportedArchives} = require('./supportedfiles.json');
const {getOperation} = require('./operations');
const getFileExtension = (filename) => {
	return filename.split('.').pop();
};
const getFilename = (filename) => {
	return filename.split('.').slice(0, -1).join('.');
};
const isSupportedArchive = (extension) => {
	return (_.includes(supportedArchives, extension));
};
const isSupported = (ext) => {
	/*TODO: return don't convert if files are [jpg, psd,png,pdf]*/
	const defaultFormats = ['jpg', 'psd', 'png', 'pdf'];
	return (isSupportedArchive(ext)) ?
		getOperation('extract') :
		(_.includes(supportedFileFormats, ext)) ?
			(_.includes(defaultFormats, ext)) ?
				getOperation('dontConvert') :
				getOperation('convert', ext) :
			getOperation('unsupported');
};

module.exports = {getFilename, getFileExtension, isSupported};
