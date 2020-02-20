// @ts-ignore
const request = require("request");
// @ts-ignore
const fs = require("fs");
// @ts-ignore

const {uploadFile} = require('./uploader');
// @ts-ignore
const {NODE_ENV, IMAGINARY_UPLOAD_URL, PROCCESSED_FOLDER} = process.env;


// @ts-ignore
const upload = (file, filename) => {
	// @ts-ignore
	return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			url: IMAGINARY_UPLOAD_URL,
			formData:
				{
					file:
						{
							value: fs.createReadStream(file),
							options:
								{
									filename: filename,
								}
						}
				}
		};
		console.log(options, file, filename);
		if (NODE_ENV !== 'local') {
			if (PROCCESSED_FOLDER) {
				console.log('processedFolder pressent');
				console.log(file, filename);
				uploadFile(file, `${PROCCESSED_FOLDER}/${filename}`);

			} else {
				// @ts-ignore
				request(options, (error, response, body) => {
					console.log(body);
				});
			}


		}

		resolve(file);
	});
};

// @ts-ignore
module.exports = {
	imaginary: {
		upload: upload
	}
};
