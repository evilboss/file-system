const onezip = require('onezip');
const path = require('path');
const cwd = process.cwd();
const name = '/storage/zip/pipe.zip';
const to = cwd + '/storage/zip/pipe-io';
const from = path.join(cwd, name);
console.log(to, from);
const extract = onezip.extract(from, to);

extract.on('file', (name) => {
	console.log(name);
});

extract.on('start', (percent) => {
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
