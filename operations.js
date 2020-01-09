const _ = require('lodash');

const fileOperations = {
	extract: (file) => {
		return new Promise(((resolve, reject) => {
			console.log('extract');
			resolve(file);
		}))
	},
	pdf: (file) => {
		return new Promise(((resolve, reject) => {
			console.log('pdf');
			resolve(file);
		}))
	},
	jpg: (file) => {
		return new Promise(((resolve, reject) => {
			console.log('jpg');
			resolve(file);
		}))
	},
};

const getOperation = (ext) => {
	return fileOperations[ext];
};
module.exports = {getOperation};
