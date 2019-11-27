const tar = require('tar');
const unTar = () => {
	tar.x()

};
const packTar = (sa) => {
	return new Promise((resolve, reject) => {
		console.log(sa);
		/*tar.c({});*/
	});
};
packTar('sample');
