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
			if (info) {
				resolve(convertToResultArray(info));
			}
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
	upnackAll(target, outputDir).then((result) => {
		console.table(result);
	}).catch((error) => {
		console.log('catching', error);
		//TODO: Log errors

	});
};
const convertToResultArray = (output) => {
	const tempArray = output.split('\n');
	const result = [];
	const lastIndex = (_.last(tempArray) === '') ? tempArray.length - 1 : tempArray.length;
	tempArray.map((item, index) => {
		let path = '';
		let type = 'file';
		let status = '';
		if (item !== '') {
			if (item === _.first(tempArray)) {
				type = 'header';
				//get second to the last array item
			} else if (index === tempArray.length - 2) {
				type = 'footer';
				status = item;
			} else {
				status = item.match(/\(+\d{1,} B\)...+/g);
				path = item.replace(/\(+\d{1,} B\)...+/g, '');
				if (status == null) {
					status = item.match(/\(dir\)... OK.+/g);
					path = item.replace(/\(dir\)... OK.+/g, '');
					type = 'dir';
					if (status == null) {
						type = 'unknown';
					}

				}
			}
			result.push({path: path.trim(), status: status, type: type});
		}

	});
	return result;
};
processFile('./storage/zip/miltidir.zip', './storage/zip/');
