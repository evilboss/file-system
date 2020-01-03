const fs = require('fs');
const onezip = require('onezip');
const path = require('path');
const cwd = process.cwd();
const name = '/storage/zip/pipe.zip';
const to = cwd + '/storage/zip/pipe-io';
const from = path.join(cwd, name);
console.log(to, from, onezip);

//
const extractZip = {};
const zip = () => {

	return new Promise((resolve, reject) => {
		const pack = onezip.pack(path.join(cwd, '/storage/zip/toCompress'), path.join(cwd, '/storage/zip/pipe-io/toCompress.zip'), [
			'file1.txt',
			'file2.txt',
			'file3.txt'
		]);
		pack.on('file', (name) => {
			console.log(name);
		});

		pack.on('start', () => {
			console.log('start packing');
		});

		pack.on('progress', (percent) => {
			console.log(percent + '%');
		});

		pack.on('error', (error) => {
			console.error(error);
			reject(error);
		});

		pack.on('end', () => {
			resolve('done');
		});
	});
};
const unzip = () => {
	return new Promise((resolve, reject) => {
		const extract = onezip.extract('./storage/zip/pipe-io/toCompress.zip', './storage/zip/pipe-io/extract');
		extract.on('file', (name) => {
			console.log(name);
			fs.unlink(`./storage/zip/pipe-io/extract/${name}`, (err) => {
				if (err) {
					console.error(err);
					return;
				}

				//file removed
			})
		});

		extract.on('end', () => {
			console.log('done');
			resolve('done');
		});
	})

};
/*
zip usage
zip()
	.then((result) => unzip().then().catch())
	.catch((err) => {
		console.error(err)
	});
*/
unzip();
