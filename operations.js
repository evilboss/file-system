const _ = require('lodash');
const {listAll, unpackOne} = require('./extraction');
const {convert} = require('./conversion');

const fileOperations = {
	extract: (file) => {
		return new Promise(((resolve, reject) => {
			console.log('extract');
			resolve(unpackOne);
		}));
	},

	convert: (file) => {
		return new Promise(((resolve, reject) => {
			resolve(convert);
		}));
	},
	dontConvert: (file) => {
		console.log('dont convert');
		return Promise.resolve(
			() => {
			console.log(file)
		})
	},
	unsupported: (file) => {
		console.log('unsupported');
		return Promise.resolve(
			() => {
				console.log(file)
			})
	}

};

const getOperation = (ext) => {
	return fileOperations[ext];
};
module.exports = {getOperation};
