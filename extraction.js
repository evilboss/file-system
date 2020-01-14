const _ = require('lodash');
const ua = require('./unar');
const {uploadFile} = require('./uploader');

const outputdir = './storage/extract/';
const listAll = (target) => {
	return new Promise((resolve, reject) => {
		ua.list(target, {quiet: true}, (error, files) => {
			(error) ? reject(error) : resolve(_.drop(files));
		})
	})
};

const unpackOne = (target, output, file) => {
	return new Promise((resolve, reject) => {
		ua.unpack(target, {
			archiveFile: target,
			targetDir: output,
			files: file,
			quiet: true,
			forceOverwrite: true,

		}, (err, files, info) => {
			if (err) {
				console.error(err);
				reject(err)
			} else {
				//Upload file
				resolve(`${output}${file}`);
			}

		});

	});
};

const extractFiles = (file, account) => {
	const {getFileExtension, renameFile} = require('./filename');

	listAll(file).then((result => {
		_.each(result, (item, key) => {
			if (!getFileExtension(item).includes('/')) {
				unpackOne(file, outputdir, item).then((payload) => {
					uploadFile(payload, renameFile(payload, account));
				}).catch(err => console.error(err));
			}

		})

	})).catch(error => console.error(error)).finally(() => {
		return new Promise((resolve, reject) => {
			resolve('ok');

		})
	})
	;
};
module.exports = {
	extractFiles
};
