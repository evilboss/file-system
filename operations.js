const _ = require('lodash');
const {listAll, unpackOne} = require('./extraction');
const {convert} = require('./conversion');

const fileOperations = {
	extract: (file) => {
		return new Promise(((resolve, reject) => {
			console.log('extract');
			resolve(unpackOne);
		}))
	},

	convert: () => {
		return new Promise(((resolve, reject) => {
			resolve(convert
	}
};

const getOperation = (ext) => {
	return fileOperations[ext];
};
module.exports = {getOperation};
