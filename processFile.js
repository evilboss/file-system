const ua = require('./unar');
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
const isSupported = (ext) => {
	//console.log(fileInfo);
	return (_.includes(supportedArchives, ext)) ?
		getOperation('extract') :
		(_.includes(supportedFileFormats, ext))
			? getOperation(ext) :
			'unsupported file';
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
const getFileExtension = (filename) => {
	return filename.split('.').pop();
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
		const operation = isSupported(getFileExtension(target));
		if (operation !== 'unsupported file') {
			resolve(operation);
		} else {
			reject('unsupported file');
		}

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
processFile('file.pdf', 'bla');
