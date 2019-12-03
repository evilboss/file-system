const ua = require('all-unpacker');


const upnackAll = (target, output) => {
	return new Promise((resolve, reject) => {
		ua.unpack(target, {
			targetDir: output,
			forceOverwrite: true
		}, (err, files, info) => {
			if (err) reject(err);
			if (files || info) resolve(files, info);
		});
	});

};
const listAll = (target) => {
	return new Promise(() => {
		ua.list(target, {}, (error, files, something) => {
			console.log(error, files, something)
		})
	})
};
// Usage
/*upnackAll('./storage/tar/tar.tar', './storage/tar/extracted')
	.then((files, info) => {
		console.log('files:', files, 'info', info);
	}).catch((err) => {
	console.error(err);
});*/
listAll('./storage/tar/tar.tar');
