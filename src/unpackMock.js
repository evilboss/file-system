const ua = require('all-unpacker');
const fs = require('fs');
const _ = require('lodash');

const verifyFiles = (target, outputDir) => {
	listAll(target).then((result) => {
		checkFiles(getOutputDir(target, outputDir))
			.then((files) => {
				const extracted = _.intersection(result, files);
				if (result.length > extracted.length) {
					// TODO: get unextracted files list
					const missingFiles = _.difference(result, extracted);
					// console.log('files were missing', missingFiles);
				} else {
					console.log('no missing files');
				}
			});
	});
};
const checkFiles = (target) => {
	return new Promise(((resolve, reject) => {
		fs.readdir(target, (err, files) => {
			(err) ? reject(err) : resolve(files);
		});
	}));


};
const getOutputDir = (target, outputDir) => {
	let folderPath = _.last(target.split('/'));
	folderPath = folderPath.substring(0, folderPath.indexOf('.'));
	console.log(`${outputDir}${folderPath}`);
	return `${outputDir}${folderPath}`;
};

const upnackAll = (target, output) => {
	return new Promise((resolve, reject) => {
		ua.unpack(target, {
			targetDir: output,
			noRecursion: true,
			forceOverwrite: true
		}, (err, files, info) => {
			if (err) reject(err);

			if (files || info) resolve(files, info);
		});
	});

};
const listAll = (target) => {
	return new Promise((resolve, reject) => {
		ua.list(target, {}, (error, files) => {
			console.table(files);
			(error) ? reject(error) : resolve(_.drop(files));
		})
	})
};
const processFile = (target, outputDir) => {
	upnackAll(target, outputDir).then((result, info) => {
		console.log(result, info);
	});
};

processFile('./storage/rar/Invoice.rar', './storage/rar/');
