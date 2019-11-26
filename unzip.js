const onezip = require('onezip');
const path = require('path');
const cwd = process.cwd();
const name = '/storage/zip/pipe.zip';
const to = cwd + '/storage/zip/pipe-io';
const from = path.join(cwd, name);
console.log(to, from, onezip);

// const extract = onezip.extract(from, to);
class extractZip {

	unzip() {
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

	zip() {
		const pack = onezip.pack(from, to, [
			'LICENSE',
			'README.md',
			'package.json'
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
	}
}

