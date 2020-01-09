const _ = require('lodash');
const ua = require('./unar');
const listAll = (target) => {
	return new Promise((resolve, reject) => {
		ua.list(target, {quiet: true}, (error, files) => {
			(error) ? reject(error) : resolve(_.drop(files));
		})
	})
};

const unpackOne = (target, output, file) => {
	return new Promise((resolve, reject) => {
		ua.unpack(target, {
			targetDir: output,
			files: file,
			quiet: true,
			forceOverwrite: true,

		}, (err, files, info) => {
			(err) ? reject(err) : resolve(`${output}${file}`);
		});
	});
};

module.export = {
	unpackOne,
	listAll,
};