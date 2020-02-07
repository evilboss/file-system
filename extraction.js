/* istanbul ignore file */
// @ts-ignore
const _ = require('lodash');
// @ts-ignore

const fs = require('fs');
// @ts-ignore

const fse = require('fs-extra');

// @ts-ignore
const ua = require('./unar');
// @ts-ignore
const {uploadFile} = require('./uploader');
// @ts-ignore
const {INCOMING_SECONDARY_FOLDER} = process.env;
const outputdir = './storage/';
// @ts-ignore
const listAll = (target, all) => {
	return new Promise((resolve, reject) => {
		// @ts-ignore
		ua.list(target, {quiet: true}, (error, files) => {
			console.log('head', _.head(files));
			(error) ? reject(error) : resolve(_.drop(files));
		})
	})
};
// @ts-ignore
const forEachPromise = (items, file, account, fn, context) => {
	// @ts-ignore
	return items.reduce((promise, item) => promise.then(() => fn(item, file, account, context)), Promise.resolve());
};

// @ts-ignore
const logItem = (item, file, account) => new Promise((resolve, reject) => {
	const {getFileExtension, renameFile} = require('./filename');

	process.nextTick(() => {
		if (!getFileExtension(item).includes('/')) {
			unpackOne(file, outputdir, item).then((payload) => {
				uploadFile(payload, `${INCOMING_SECONDARY_FOLDER}/${renameFile(payload, account)}`, 'ingestion-ph-dev-secondary').then((result) => {
					resolve(result);
				});
			}).catch(err => reject(err));
		} else {
			resolve();
		}

	})
});
// @ts-ignore
const unpackOne = (target, output, file) => {
	return new Promise((resolve, reject) => {
		ua.unpack(target, {
			archiveFile: target,
			targetDir: output,
			files: file,
			noDirectory: true,
			quiet: true,
			forceOverwrite: true,
// @ts-ignore
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
// @ts-ignore
const extractFiles = (file, account) => {
	// @ts-ignore
	const {getFileExtension, renameFile} = require('./filename');
	return new Promise((resolve, reject) => {
		// @ts-ignore
		fse.pathExists(file)
			.then(exists => {
				if (exists) {
					listAll(file).then((items => {
						// @ts-ignore
						forEachPromise(items, file, account, logItem).then((done) => {
							// @ts-ignore
							/*fs.unlink(file, err => {
								if (err) reject(err); else {
									console.log(`removed ${file} on local storage`);
								}
								// if no error, file has been deleted successfully
							});*/
							fse.remove(file)
								.then(() => {
									console.log(`removed ${file} on local storage`);
								})
								.catch(err => {
									console.error(err)
								})
							fse.remove(`${outputdir}/${_.last(items)}`)
								.then(() => {
									console.log(`success! removed ${outputdir}/${_.last(items)} directory on local storage`)
								})
								.catch(err => {
									console.error(err)
								})

						});
					})).catch(error => reject(error));

				}
			}) // => false


	});

};
module.exports = {
	extractFiles
};
