const fs = require('fs');

const {exec} = require('child_process');
const _ = require('lodash');
const convert = (file) => new Promise((resolve, reject) => {
	console.log('converting file', file);
	const images = ['bmp', 'gif', 'tiff'];
	const outDir = './storage/convert';
	const format = (_.includes(images, getFileExtension(file))) ? 'png' : 'pdf';
	exec(`soffice --headless --convert-to ${format} ${file} --outdir ${outDir}`, (err, stdout, stderr) => {
		(err) ? reject(err) : resolve(`${outDir}${getFilename(file)}.${format}`);
	});
});

module.exports = {
	convert: convert
};
