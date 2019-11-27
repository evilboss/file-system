const tar = require('tar');
const unTar = () => {
	tar.x({
		cwd: './storage/tar/',
		file: './storage/tar/tar.tar'
	}).then(() => {
		console.log('done');
	}).catch((error) => {
		console.error(error);
	});
};
const packTar = (sa) => {
	return new Promise((resolve, reject) => {
		console.log(sa);
		/*tar.c({});*/
	});
};
unTar();
