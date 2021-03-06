// @ts-ignore
const _ = require('lodash');
// @ts-ignore
const fs = require('fs');

// @ts-ignore
const {conversion} = require('./conversion');
// @ts-ignore
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
// @ts-ignore
const {extractFiles} = require('./extraction');
// @ts-ignore
const {NODE_ENV, OUTGOING_FOLDER} = process.env;
// @ts-ignore
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
            conversion(file).then(result => {
                return (result);
            }).then((result) => {
                if (NODE_ENV !== 'local') {
                    // @ts-ignore
                    fs.unlink(file, err => {
                        if (err) throw err; else {
                            console.log(`removed ${file} on local storage`);
                        }
                        // if no error, file has been deleted successfully
                    });
                }
                resolve(result);
            }).catch(error => {

                reject(error);
            })
        }));
    },
    // @ts-ignore
    dontConvert: (file) => {
        // @ts-ignore

        return new Promise(
            (resolve) => {
                resolve({filename: file, imaginary: true});
            })
    },
    // @ts-ignore
    uploadToFurtherProcessing: (file) => {
        // @ts-ignore

        return new Promise(resolve => {
            resolve({filename: file, folder: OUTGOING_FOLDER})
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
