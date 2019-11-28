const ua = require('all-unpacker');


const upnackAll = (target, output) => {
	return new Promise((resolve, reject) => {
		ua.unpack(target, {
			targetDir: output,
			forceOverwrite: true
		}, (err, files, text) => {
			if (err) reject(err);
			if (files || text) resolve(files, text);
		});
	});

};

// Usage
upnackAll('./storage/tar/tar.tar', './storage/tar/extracted')
	.then((files, text) => {
		console.log(files, text);
	}).catch((err) => {
	console.error(err);
});
