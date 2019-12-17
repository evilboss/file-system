const ua = require('./src/unar');
const fs = require('fs');
const _ = require('lodash');
const mmm = require('mmmagic');
const Magic = require('mmmagic').Magic;
const readChunk = require('read-chunk');
const fileType = require('file-type');
const {supportedFileFormats, supportedArchives} = require('./supportedfiles.json');


const getFileType = (filePath) => {
	/*TODO: support doc,xls,ppt files*/
	const buffer = readChunk.sync(filePath, 0, fileType.minimumBytes);
	return fileType(buffer);
};
const getFileInfo = (file) => {

	const magic = new Magic(mmm.MAGIC_NONE);
	const fileInfo = getFileType(file);
	return new Promise(((resolve, reject) => {
		magic.detectFile(file, (err, result) => {
			if (err) {
				//TODO: Log in logger or add in collection error
				console.error(err);
				reject(err)
			} else if (result && fileInfo) {

				const magicResult = result.split(',');

				if (fileInfo.mime === 'application/x-msi') {
					fileInfo.ext = (_.includes(result, 'Microsoft Office Word')) ? 'doc' : (_.includes(result, 'PowerPoint')) ?
						'ppt' : (_.includes(result, 'Excel')) ? 'xls' : fileInfo.ext;


				}
				resolve({
					mimeType: fileInfo.mime,
					ext: fileInfo.ext,
					magicType: magicResult[0].trim(),
					version: (magicResult[1]) ? magicResult[1].trim() : null
				});
			}


		});
	}));


};

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
			return new Promise((resolve1, reject1) => {
				resolve1(param);
			})
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
			result(target).then(result => console.log(result));
		})
		.catch((error) => {
			console.error(error)
		});
};
processFile('file.jpg', 'bla');
