// @ts-ignore
const fs = require('fs');
// @ts-ignore
const {exec} = require('child_process');
// @ts-ignore
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
// @ts-ignore
const _ = require('lodash');
// @ts-ignore
const conversion = (file) => {
    // @ts-ignore
    // @ts-ignore
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const {getFilename, getFileExtension, getFile} = require('./filename');
        const images = ['bmp', 'gif', 'tiff'];

        const outDir = './storage/convert';
        const format = (_.includes(images, getFileExtension(file))) ? 'png' : 'pdf';
        // @ts-ignore
        exec(`soffice --headless --convert-to ${format} ${file} --outdir ${outDir}`, (err, stdout, stderr) => {
            (err) ? reject(err) : resolve({
                filename: `${outDir}/${getFilename(getFile(file))}.${format}`,
                imaginary: true
            });
        });
    });
};
// @ts-ignore
module.exports = {
    conversion: conversion
};
