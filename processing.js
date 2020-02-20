/* istanbul ignore file */
// @ts-ignore
const _ = require('lodash');
// @ts-ignore
const fs = require('fs');
// @ts-ignore
const {uploadFile} = require('./uploader');
// @ts-ignore
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
const {imaginary} = require('./imaginary');
// @ts-ignore

const {INCOMING_SECONDARY_FOLDER} = process.env;

// @ts-ignore
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

// @ts-ignore
const processFile = (file, account) => {
	decideFileProcess(file).then(operation => {
		// @ts-ignore
		operation(file, account).then((payload) => {
			if (payload && payload.filename) {
				// @ts-ignore
				if (payload.imaginary) imaginary.upload(payload.filename, renameFile(payload.filename, account)).then(file => {
					console.log(`uploaded ${renameFile(payload.filename, account)} to imaginary`);
					// @ts-ignore
					fs.unlink(file, err => {
						if (err) throw err; else {
							console.log(`removed ${file} on local storage`);
						}
						// if no error, file has been deleted successfully
					});
				}); else {
					uploadFile(payload.filename, `${payload.folder}/${renameFile(payload.filename, account)}`, payload.bucket);
				}

			}
			// @ts-ignore
		}).catch(err => {
			console.error(err)
		});
	}).catch(error => {
		console.error(error)
	});
};
module.exports = {
	processFile
};
/*
*  USAGE:
*  processFile('./testStorage/DATA_Ingestion/DOC.doc', "JLU");
*
* */
