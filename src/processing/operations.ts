// @ts-ignore
const _ = require('lodash');
// @ts-ignore
const {conversion} = require('./conversion');
// @ts-ignore
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
// @ts-ignore
const {extractFiles} = require('./extraction');


const fileOperations = {
    // @ts-ignore
    extract: (file, accountName) => {
// @ts-ignore

        return new Promise(((resolve, reject) => {
            extractFiles(file, accountName);
            resolve('ok');
        }));
    },
    // @ts-ignore
    convert: (file) => {
        // @ts-ignore

        return new Promise(((resolve, reject) => {
            // @ts-ignore
            conversion(file).then(result => {
                resolve(result);
                // @ts-ignore
            }).catch(error => {
                console.error(error)
            })
        }));
    },
    // @ts-ignore
    dontConvert: (file) => {
        // @ts-ignore

        return new Promise(
            (resolve) => {
                resolve({filename: file, bucket: 'ingestion-ph-dev-fake-imaginary'});
            })
    },
    // @ts-ignore
    unsupported: (file) => {
        // @ts-ignore

        return new Promise(
            (resolve) => {
                resolve({filename: '', bucket: ''});
            })
    }

};
// @ts-ignore
const getOperation = (ext) => {
    // @ts-ignore
    return fileOperations[ext];
};
// @ts-ignore

module.exports = {getOperation};
