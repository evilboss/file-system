const fs = require('fs');
const testFolder = './storage/';
const mock = require('mock-fs');
mock({
    './storage/': {
        'some-file.txt': 'file content here',
        'othefile.file.marck': 'no contents',
        'empty-dir': {/** empty directory */}
    }
});

fs.readdir(testFolder, (err, files) => {
    console.log(files);
});
fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
});
mock.restore();
fs.readdir(testFolder, (err, files) => {
    console.log(files);
});
