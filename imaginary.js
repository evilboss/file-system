// @ts-ignore
const request = require("request");
// @ts-ignore
const fs = require("fs");
// @ts-ignore
const {NODE_ENV, IMAGINARY_UPLOAD_URL} = process.env;


// @ts-ignore
const uploadFile = (file, filename) => {
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
			// @ts-ignore
			request(options, (error, response, body) => {
				console.log(body);
			});
		}
		resolve(file);
	});
};

// @ts-ignore
module.exports = {
	imaginary: {
		uploadFile
	}
};
