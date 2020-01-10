const _ = require('lodash');
const {listAll, unpackOne} = require('./extraction');
const {conversion} = require('./conversion');
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');

const fileOperations = {
	extract: (file) => {
		return new Promise(((resolve, reject) => {
			resolve(unpackOne);
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
