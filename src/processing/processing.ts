// @ts-ignore
const _ = require('lodash');
// @ts-ignore
const {uploadFile} = require('./uploader');
// @ts-ignore
const {getFilename, getFileExtension, isSupported, generatefileName, renameFile} = require('./filename');
const storagePath = `${process.env.PWD}/storage/`;
// @ts-ignore
const decideFileProcess = (target) => {
  // @ts-ignore
  return new Promise(((resolve, reject) => {
    const operation = isSupported(getFileExtension(target));
    if (operation !== 'unsupported file') {
      resolve(operation);
    } else {
      reject('unsupported file');
    }
  }))
};
// @ts-ignore
const processFile = (file, account) => {
  return new Promise((resolve, reject) => {
    decideFileProcess(file).then(operation => {
      // @ts-ignore

      operation(file, account).then((payload) => {
        console.log(payload);
        if (payload && payload.filename) {
          resolve(uploadFile(payload.filename, renameFile(payload.filename, account), payload.bucket));
        }
        // @ts-ignore
      }).catch(err => {
        reject(err);
      });
    }).catch(error => {
      reject(error);
    });
  });

};

/*
*  USAGE:
*  processFile('./testStorage/DATA_Ingestion/DOC.doc', "JLU");
*
* */
module.exports = {processFile};
