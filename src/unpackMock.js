const ua = require('all-unpacker');
const fs = require('fs');
const _ = require('lodash');

const verifyFiles = (target) => {
	listAll(target).then((result) => {
		checkFiles('./storage/zip/pipe-io/extract')
			.then((files) => {
				const extracted = _.intersection(result, files);
				console.log(result.length > extracted.length);
				console.log('intersection: ', extracted, 'Uniq:', _.uniq(_.union(result, files)), result.length)
			});
	});
};
const checkFiles = (target) => {
	return new Promise(((resolve, reject) => {
		fs.readdir(target, (err, files) => {
			(err) ? reject(err) : resolve(files);
		});
	}));


};

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
	return new Promise((resolve, reject) => {
		ua.list(target, {}, (error, files) => {
			(error) ? reject(error) : resolve(_.drop(files));
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


verifyFiles('./storage/zip/pipe-io/toCompress.zip');
