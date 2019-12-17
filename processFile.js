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
	return new Promise((resolve, reject) => {

	});
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
			result(target);
		})
		.catch((error) => {
			console.error(error)
		});
};
processFile('file.jpg', 'bla');
