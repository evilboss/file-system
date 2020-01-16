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
  return new Promise((resolve, reject) => {
    const {getFilename, getFileExtension, getFile} = require('./filename');
    const images = ['bmp', 'gif', 'tiff'];

    const outDir = './storage/convert';
    const format = (_.includes(images, getFileExtension(file))) ? 'png' : 'pdf';
    // @ts-ignore
    exec(`soffice --headless --convert-to ${format} ${file} --outdir ${outDir}`, (err, stdout, stderr) => {
      (err) ? reject(err) : resolve({
        filename: `${getFilename(file)}${outDir}/${getFilename(getFile(file))}.${format}`,
        bucket: 'ingestion-ph-dev-fake-imaginary'
      });
    });
  });
};
module.exports = {
  conversion
};
