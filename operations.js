// @ts-ignore
const _ = require('lodash');
// @ts-ignore
const {conversion} = require('./conversion');
// @ts-ignore
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
// @ts-ignore
const {extractFiles} = require('./extraction');
const {OUTGOING_FOLDER} = process.env;
const fileOperations = {
	// @ts-ignore
	extract: (file, accountName) => {
		return new Promise(((resolve, reject) => {
			extractFiles(file, accountName);
			resolve('ok');
		}));
	},
	// @ts-ignore
	convert: (file) => {
		return new Promise(((resolve, reject) => {
			conversion(file).then(result => {
				resolve(result);
			}).catch(error => {
				console.error(error)
			})
		}));
	},
	// @ts-ignore
	dontConvert: (file) => {
		return new Promise(
			(resolve) => {
				resolve({filename: file, imaginary: true});
			})
	},
	// @ts-ignore
	uploadToFurtherProcessing: (file) => {
		return new Promise(resolve => {
			resolve({filename: file, folder: OUTGOING_FOLDER})
		})
	},
	// @ts-ignore
	unsupported: (file) => {
		return new Promise(
			(resolve) => {
				resolve({filename: '', bucket: ''});
			})
	}

};
// @ts-ignore
const getOperation = (ext) => {
	// @ts-ignore
	return fileOperations[ext];
};
module.exports = {getOperation, fileOperations};
