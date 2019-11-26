const onezip = require('onezip');
const path = require('path');
const cwd = process.cwd();
const name = '/storage/zip/pipe.zip';
const to = cwd + '/storage/zip/pipe-io';
const from = path.join(cwd, name);
console.log(to, from, onezip);

//
const extractZip = {

	unzip() {
		const extract = onezip.extract(from, to);
		extract.on('file', (name) => {
			console.log(name);
		});

		extract.on('start', (percent) => {
			// set status to
			console.log('extracting started');
		});

		extract.on('progress', (percent) => {
			console.log(percent + '%');
		});

		extract.on('error', (error) => {
			console.error(error);
		});

		extract.on('end', () => {
			console.log('done');
		});
	}


};
const zip = () => {
	const pack = onezip.pack(cwd + '/storage/zip/toCompress', cwd + '/storage/zip/pipe-io/toCompress.zip', [
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
	});

	pack.on('end', () => {
		console.log('done');
	});
};
zip();
