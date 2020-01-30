const fs = require('fs');
const {exec} = require('child_process');
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
const _ = require('lodash');
const conversion = (file) => {
	return new Promise((resolve, reject) => {
		const {getFilename, getFileExtension, getFile} = require('./filename');
		const images = ['bmp', 'gif', 'tiff'];

		const outDir = './storage/convert';
		const format = (_.includes(images, getFileExtension(file))) ? 'png' : 'pdf';
		exec(`soffice --headless --convert-to ${format} ${file} --outdir ${outDir}`, (err, stdout, stderr) => {
			(err) ? reject(err) : resolve({
				filename: `${outDir}/${getFilename(getFile(file))}.${format}`,
				imaginary: true
			});
		});
	});
};
module.exports = {
	conversion: conversion
};
