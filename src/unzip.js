const onezip = require('onezip');
const path = require('path');
const cwd = process.cwd();
const name = '/storage/zip/pipe.zip';
const to = cwd + '/storage/zip/pipe-io';
const from = path.join(cwd, name);
const dirTree = require("directory-tree");
const mock = require('mock-fs');

console.log(to, from, onezip);

//
const extractZip = {};
mock({
	'./storage/': {
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
const unzip = () => {
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

const zip = () => {

	const pack = onezip.pack(path.join(cwd, '/storage/zip/toCompress'), path.join(cwd, '/storage/zip/pipe-io/notToCompress.zip'), [
		'notFile1.txt',
		'notFile2.txt',
		'notFile3.txt'
	]);
	pack.on('file', (name) => {
		console.log(name, JSON.stringify(dirTree('./storage/')));
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
console.log(JSON.stringify(dirTree('./storage/')));
// unzip();
