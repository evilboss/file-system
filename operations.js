const _ = require('lodash');
const {conversion} = require('./conversion');
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
const {extractFiles} = require('./extraction');

const fileOperations = {
	extract: (file, accountName) => {
		return new Promise(((resolve, reject) => {
			extractFiles(file, accountName);
			resolve('ok');
		}));
	},
	convert: (file) => {
		return new Promise(((resolve, reject) => {
			conversion(file).then(result => {
				resolve(result);
			}).catch(error => {
				console.error(error)
			})
		}));
	},
	dontConvert: (file) => {
		return new Promise(
			(resolve) => {
				resolve({filename: file, bucket: 'ingestion-ph-dev-main'});
			})
	},
	unsupported: (file) => {
		return new Promise(
			(resolve) => {
				resolve({filename: '', bucket: ''});
			})
	}

};

const getOperation = (ext) => {
	return fileOperations[ext];
};
module.exports = {getOperation};
