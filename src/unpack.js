const ua = require('./unar');
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
const renameFile = (currentPath, newPath) => {
	fs.rename(currentPath, newPath, (err => console.error(err)));
};
const makePath = (folderPath, filename) => {
	return `${folderPath}${filename}`;
};

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
		console.log('extract');
		ua.unpack(target, {
			targetDir: output,
			forceOverwrite: true,

		}, (err, files, info) => {
			if (err) reject(err);
			if (info) {
				resolve(convertToResultArray(info));
			}
		});
	});

};
const unpackOne = (target, output, file) => {
	return new Promise((resolve, reject) => {
		console.log('extract');
		ua.unpack(target, {
			targetDir: output,
			files: file,
			forceOverwrite: true,

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
const processFile = (target, account) => {

	/*
		upnackAll(target, outputDir).then((result) => {
			console.table(result);
		}).catch((error) => {
			console.log('catching', error);
			setTimeout(() => {
				console.log('timeout')
			}, 500);
			})
	*/
	/*TODO: list all files
	*		Make filepath based on account
	* 	Rename File
 	* 	Unpack one by one
	*		Move/upload unpacked file
	* 	delete file
	* */
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
				console.log(magicResult);

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
const decisionPoint = (file) => {
	return new Promise((resolve, reject) => {
		getFileInfo(file).then((result) => {
			(result) ? resolve(isSupported(result)) : reject('no file')
		});
	});

};


const isSupported = (fileInfo) => {
	//console.log(fileInfo);
	return (_.includes(supportedArchives, fileInfo.ext)) ?
		'extract file' :
		(_.includes(supportedFileFormats, fileInfo.ext))
			? 'convert file' :
			'unsupported file';
};

//processFile('./storage/rar/Invoice.rar', './storage/extracted/');
/*│    0    │ 'image/png' │ 'png' │ 'PNG image data' │ '1200 x 1200' │
*/


const processDesicion = () => {
	let files = [
		/*'./testStorage/DATA_Ingestion/BMP.bmp',*/
		'testStorage/DATA_Ingestion/DOC.doc',
		/*'testStorage/DATA_Ingestion/DOCX.docx',
		'testStorage/DATA_Ingestion/GIF.gif',
		'testStorage/DATA_Ingestion/HTML.html',
		'testStorage/DATA_Ingestion/JPEG.JPG',
		'testStorage/DATA_Ingestion/ODP.odp',
		'testStorage/DATA_Ingestion/ODS.ods',
		'testStorage/DATA_Ingestion/PDF.pdf',
		'testStorage/DATA_Ingestion/PNG.png',*/
		'testStorage/DATA_Ingestion/PPT.ppt',
		/*'testStorage/DATA_Ingestion/PPTX.pptx',
		'testStorage/DATA_Ingestion/RTF.rtf',
		'testStorage/DATA_Ingestion/text.psd',
		'testStorage/DATA_Ingestion/TIFF.tiff',*/
		'testStorage/DATA_Ingestion/XLS.xls',
		/*		'testStorage/DATA_Ingestion/XLSX.xlsx',
				'testStorage/DATA_Ingestion/XML.xml'*/
	];
	files.map((file, index) => {
		decisionPoint(file).then((result) => {
			console.log(file, result);
		}).catch(err => {
			console.error(err);
		});
	});
};
processDesicion();
