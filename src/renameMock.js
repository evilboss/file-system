const fs = require('fs');

const folderpath = './storage/';
const filename = 'file1.file';
const mock = require('mock-fs');
mock({
    './storage/': {
        'file1.file': 'sme file contents',
        'notRealFile.file': 'no contents'
    }

});

const readDirectory = () => {
    fs.readdir(folderpath, (err, files) => {
        console.log(files);
    });
};
const renameFile = (currentPath, newPath) => {
    fs.rename(currentPath, newPath, (err => console.error(err)));
};
const makePath = (folderPath, filename) => {
    return `${folderPath}${filename}`;
};
readDirectory();
renameFile(makePath(folderpath, 'file1.file'), makePath(folderpath, 'file3.file'));
readDirectory();
mock.restore();
readDirectory();
