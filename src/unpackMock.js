const ua = require('all-unpacker');
const fs = require('fs');
const _ = require('lodash');
const mmm = require('mmmagic');
const Magic = require('mmmagic').Magic;
const readChunk = require('read-chunk');
const fileType = require('file-type');

const supportedFileFormats = [
	'doc',
	'ppt',
	'xls',
	'bmp',
	'odt',
	'odp',
	'ods',
	'rtf',
	'pptx',
	'docx',
	'xlsx',
	'tiff',
	'xml',
	'gif',
	'html',
	'pdf',
	'png',
	'jpg',
	'jpeg',
	'psd'
];
const supportedArchives = ['jar', 'zip', 'rar', '7z', 'tar', 'gz', 'eml', 'msg'];
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
		setTimeout(() => {
			console.log('timeout')
		}, 500);

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
const getFileType = (filePath) => {
	const buffer = readChunk.sync(filePath, 0, fileType.minimumBytes);
	return fileType(buffer);
};
const getFileInfo = (file) => {

	const magic = new Magic(mmm.MAGIC_NONE);
	const fileInfo = getFileType(file);

	return new Promise(((resolve, reject) => {
		magic.detectFile(file, (err, result) => {
			console.error(result);
			if (err) {
				console.error(err);
				reject(err)
			} else if (result && fileInfo) {
				const magicResult = result.split(',');
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
const decisionPoint = (file) => {
	getFileInfo(file).then((result) => {
		console.table([result]);
		if (result) {
			isSupported(result);
		}
	});

};
const isSupported = (fileInfo) => {
	let operationType = '';
	console.log(fileInfo, _.includes(supportedFileFormats, fileInfo.ext));
	if (_.includes(supportedArchives, fileInfo.ext)) {
		console.log('extract file')
	} else if (_.includes(supportedFileFormats, fileInfo.ext)) {
		console.log('convert file')
	}
};
decisionPoint('./storage/zip/miltidir/IMG-9b2eba5e745c53d951b96f8eb4e4f12c-V.jpg');
//processFile('./storage/jar/jar.jar', './storage/jar/');
