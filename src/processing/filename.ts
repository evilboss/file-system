// @ts-ignore
const _ = require('lodash');
// @ts-ignore

const {supportedFileFormats, supportedArchives} = require(`${process.env.PWD}/supportedfiles.json`);
// @ts-ignore
const {getOperation} = require('./operations');
// @ts-ignore
const getFileExtension = (filename) => {
  return filename.split('.').pop();
};
// @ts-ignore
const getFilename = (filename) => {
  return filename.split('.').slice(0, -1).join('.').replace('./testStorage', '').replace('./storage', '').replace('./storage/convert', '');
};

// @ts-ignore
const getFile = (filename) => {
  return filename.replace(/^.*[\\\/]/, '');

};
// @ts-ignore
const generatefileName = (file, accountName) => {
  return `${accountName}/${file.replace(/\//g, '_').replace(/ /g, '').trim()}`;

};
// @ts-ignore
const renameFile = (file, account) => {
  return (`${generatefileName(getFilename(file).replace('/convert/', '').replace('/extract/', ''), account)}.${getFileExtension(file)}`);
};

// @ts-ignore
const isDefaultFormats = (ext) => {
  const defaultFormats = ['jpg', 'psd', 'png', 'pdf'];
  return (_.includes(defaultFormats, ext.toLowerCase()))
};
// @ts-ignore
const isSupportedFileFormats = (ext) => {
  return _.includes(supportedFileFormats, ext.toLowerCase());
};
// @ts-ignore
const isSupportedArchive = (ext) => {
  return (_.includes(supportedArchives, ext.toLowerCase()));
};
// @ts-ignore
const isSupported = (ext) => {
  /*TODO: return don't convert if files are [jpg, psd,png,pdf]*/
  return (isSupportedArchive(ext)) ?
    getOperation('extract') :
    (isSupportedFileFormats(ext)) ?
      (isDefaultFormats(ext)) ?
        getOperation('dontConvert') :
        getOperation('convert', ext) :
      getOperation('unsupported');
};
// @ts-ignore
const getRealFilename = (filename) => {
  const fileNames = filename.split('_incomingfiles-service_storage_');
  return fileNames[1];
};
module.exports = {
  getFilename,
  getFileExtension,
  isSupported,
  generatefileName,
  renameFile,
  getFile,
  getRealFilename
};
