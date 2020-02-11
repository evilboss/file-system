// @ts-ignore
const _ = require('lodash');
const {supportedFileFormats, supportedArchives} = require('../../../supportedfiles.json');
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
const isCSVFile = (ext) => {
    return ext === 'csv';
};

// @ts-ignore
const isSupported = (ext) => {
    return (
        isSupportedArchive(ext)) ?
        getOperation('extract') :
        (isSupportedFileFormats(ext)) ?
            (isDefaultFormats(ext)) ?
                getOperation('dontConvert') :
                getOperation('convert', ext) :
            (isCSVFile(ext)) ?
                getOperation('uploadToFurtherProcessing') :
                getOperation('unsupported');
};
// @ts-ignore
module.exports = {
    getFilename,
    getFileExtension,
    isSupported,
    generatefileName,
    renameFile,
    getFile
};
