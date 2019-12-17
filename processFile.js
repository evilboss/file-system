const {supportedFileFormats, supportedArchives} = require('./supportedfiles.json');
const fileOperations = {
	extract: (file) => {
		console.log('extract file', file)
	},
	convert: {
		pdf: (file) => {
			console.log('convert pdf', file)
		},
		jpg: (file) => {
			console.log('convert jpg', file)
		},

	}
};
const uploadFile = (targetFile) => {
// Call rename
};

const extractFile = () => {

};

const decideFileProcess = (target) => {
	return new Promise(((resolve, reject) => {
		resolve((param) => {
			console.log(param);
		})
	}))
};

const renameFile = (filename) => {

};
const convertFile = (filename) => {

};
const processFile = (target, accountName) => {
	decideFileProcess(target)
		.then((result) => {
			result('bla');
		})
		.catch((error) => {
			console.error(error)
		});
};
processFile('b;a', 'bla');
