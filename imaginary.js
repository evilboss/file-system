const request = require("request");
const fs = require("fs");
const {NODE_ENV, IMAGINARY_UPLOAD_URL} = process.env;


const uploadFile = (file, filename) => {
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
		console.log(options);
		request(options, (error, response, body) => {
			console.log(body);


		});


	};
};


module.exports = {
	imaginary: {
		uploadFile
	}
};
