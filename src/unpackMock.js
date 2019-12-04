const ua = require('all-unpacker');
const fs = require('fs');
const _ = require('lodash');
const stoutTxt = './storage/rar/Invoice.rar: RAR 5\n' +
	'  Invoice/harvest_international_invoice1 - Copy (10).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (11).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (12).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (13).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (14).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (15).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (16).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (17).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (18).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (19).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (2).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (20).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (21).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (22).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (23).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (24).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (25).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (26).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (27).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (28).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (29).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (3).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (30).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (31).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (32).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (33).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (34).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (35).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (36).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (4).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (5).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (6).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (7).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (8).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy (9).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy.gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1.gif  (45254 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (10).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (11).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (12).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (13).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (14).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (15).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (16).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (17).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (18).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (19).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (2).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (20).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (21).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (22).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (23).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (24).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (25).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (26).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (27).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (28).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (29).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (3).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (30).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (31).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (32).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (33).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (34).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (35).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (4).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (5).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (6).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (7).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (8).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (9).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy.png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px.png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (10).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (11).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (12).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (13).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (14).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (15).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (16).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (17).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (18).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (19).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (2).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (20).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (21).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (22).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (23).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (24).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (25).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (26).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (27).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (28).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (29).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (3).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (30).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (31).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (32).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (33).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (34).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (35).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (4).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (5).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (6).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (7).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (8).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (9).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy.png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px.png  (21926 B)... OK.\n' +
	'  Invoice/  (dir)... OK.\n' +
	'Successfully extracted to "./storage/rar/extracted/Invoice".\n' +
	'\n' +
	'./storage/rar/extracted/\n' +
	'national_invoice1 - Copy (9).gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1 - Copy.gif  (45254 B)... OK.\n' +
	'  Invoice/harvest_international_invoice1.gif  (45254 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (10).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (11).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (12).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (13).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (14).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (15).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (16).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (17).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (18).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (19).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (2).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (20).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (21).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (22).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (23).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (24).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (25).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (26).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (27).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (28).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (29).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (3).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (30).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (31).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (32).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (33).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (34).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (35).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (4).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (5).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (6).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (7).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (8).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy (9).png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px - Copy.png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-classic-white-750px.png  (20047 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (10).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (11).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (12).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (13).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (14).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (15).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (16).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (17).png  (21926 B)... OK.\n' +
	'  Invoice/invoice-template-us-neat-750px - Copy (18).png  (21926 B)... OK';
const verifyFiles = (target, outputDir) => {
	listAll(target).then((result) => {
		checkFiles(getOutputDir(target, outputDir))
			.then((files) => {
				const extracted = _.intersection(result, files);
				if (result.length > extracted.length) {
					// TODO: get unextracted files list
					const missingFiles = _.difference(result, extracted);
					// console.log('files were missing', missingFiles);
				} else {
					console.log('no missing files');
				}
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
const getOutputDir = (target, outputDir) => {
	let folderPath = _.last(target.split('/'));
	folderPath = folderPath.substring(0, folderPath.indexOf('.'));
	console.log(`${outputDir}${folderPath}`);
	return `${outputDir}${folderPath}`;
};

const upnackAll = (target, output) => {
	return new Promise((resolve, reject) => {
		ua.unpack(target, {
			targetDir: output,
			noRecursion: true,
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
			console.table(files);
			(error) ? reject(error) : resolve(_.drop(files));
		})
	})
};
const processFile = (target, outputDir) => {
	upnackAll(target, outputDir).then((result, info) => {
		console.log(result, info);
	});
};
const stOutToArray = () => {
	const tempArray = stoutTxt.split('\n');
	tempArray.map((item, index) => {

		console.log(item.replace(/\(+\d{1,} B\)...+/g, '').trim());
	})
};
//processFile('./storage/rar/Invoice.rar', './storage/rar/');
stOutToArray();
