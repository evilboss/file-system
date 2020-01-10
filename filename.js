const _ = require('lodash');
const {supportedFileFormats, supportedArchives} = require('./supportedfiles.json');
const {getOperation} = require('./operations');
const getFileExtension = (filename) => {
	return filename.split('.').pop();
};
const getFilename = (filename) => {
	return filename.split('.').slice(0, -1).join('.').replace('./testStorage', '').replace('./storage', '');

};

const generatefileName = (file, accountName) => {
	return `${accountName}/${file.replace(/\//g, '_').replace(/ /g, '').trim()}`;

};
const renameFile = (file, account) => {
	return (`${generatefileName(getFilename(file), account)}.${getFileExtension(file)}`);
};

const isDefaultFormats = (ext) => {
	const defaultFormats = ['jpg', 'psd', 'png', 'pdf'];

	return (_.includes(defaultFormats, ext.toLowerCase()))
};
const isSupportedFileFormats = (ext) => {
	return _.includes(supportedFileFormats, ext.toLowerCase());
};
const isSupportedArchive = (ext) => {
	return (_.includes(supportedArchives, ext.toLowerCase()));
};
const isSupported = (ext) => {
	/*TODO: return don't convert if files are [jpg, psd,png,pdf]*/
	return (isSupportedArchive(ext)) ?
		getOperation('extract') :
		(isSupportedFileFormats(ext)) ?
			(isDefaultFormats(ext)) ?
				getOperation('dontConvert') :
				getOperation('convert', ext) :
			getOperation('unsupported');
};

module.exports = {getFilename, getFileExtension, isSupported, generatefileName, renameFile};
