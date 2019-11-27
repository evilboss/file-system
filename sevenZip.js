const Seven = require('node-7z');

// myStream is an Readable stream
const myStream = Seven.extractFull('./storage/7z/7z.7z', './storage/7z/extracted/', {
	$progress: true
});

myStream.on('data', function (data) {
	console.log(data)
});

myStream.on('progress', function (progress) {
	console.log(progress);
});

myStream.on('end', function () {
	// end of the operation, get the number of folders involved in the operation
	myStream.info.get('Folders');//? '4'
	console.log('end')
});

myStream.on('error', (err) => console.error(err));

