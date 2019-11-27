const onezip = require('onezip');
const path = require('path');
const cwd = process.cwd();
const name = '/storage/zip/pipe.zip';
const to = cwd + '/storage/zip/pipe-io';
const from = path.join(cwd, name);
const dirTree = require("directory-tree");
const mock = require('mock-fs');

//
const extractZip = {};
console.log('mocking files');
mock({
	'./storage': {
		'zip': mock.directory({
			mode: 755,
			items: {
				'toCompress': mock.directory({
					mode: 755,
					items: {
						'notFile1.txt': 'bla',
						'notFile2.txt': 'bla',
						'notFile3.txt': 'blabla'
					}
				}),
				'pipe-io': mock.directory({
					mode: 755,
					items: {
						'extract': mock.directory({
							mode: 755,
							items: {}
						}),

					}
				})
			}
		})
	}

});
const zip = () => {

	return new Promise((resolve, reject) => {
		const pack = onezip.pack(path.join(cwd, 'storage/zip/toCompress'), path.join(cwd, 'storage/zip/pipe-io/notToCompress.zip'), [
			'notFile1.txt',
			'notFile2.txt',
			'notFile3.txt'
		]);
		pack.on('file', (name) => {
		});

		pack.on('start', () => {
			console.log('on pack start', JSON.stringify(dirTree('./storage')));

			console.log('zipping packing');
		});

		pack.on('progress', (percent) => {
			console.log(percent + '%');
		});

		pack.on('error', (error) => {
			reject(error);
		});

		pack.on('end', () => {
			resolve('done');
		});
	})
};

const unzip = () => {
	return new Promise((resolve, reject) => {
		const extract = onezip.extract(path.join(cwd, '/storage/zip/pipe-io/notToCompress.zip'), path.join(cwd, '/storage/zip/pipe-io/extract'));
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
			reject(error);
		});

		extract.on('end', () => {
			console.log(JSON.stringify('On End', dirTree('./storage/')));
			resolve('done');
		});
	})
};

zip().then((result) => {
	console.log(result);
	unzip().then().catch()
}).catch();
console.log(JSON.stringify('Onzip', dirTree('./storage/')));
