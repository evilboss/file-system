const request = require("request");
const fs = require("fs");

const authenticate = () => {

		console.log('authenticating');
		const options = {
			method: 'POST',
			url: 'https://backoffice.k8rnd.vatbox.com/api/login/v2.0/login',
			headers:
				{
					'cache-control': 'no-cache',
					Connection: 'keep-alive',
					'Content-Length': '0',
					'Accept-Encoding': 'gzip, deflate',
					Host: 'backoffice.k8rnd.vatbox.com',
					'Cache-Control': 'no-cache',
					Accept: '*/*',
					Authorization: 'Basic Z2lsYmVydG9AdmF0Ym94LmNvbTpmeDhFN3ZLM2puKlI='
				}
		};


		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				if (error) reject(error);

				resolve(JSON.parse(body).user_token);
			});
		})
	}
;


const uploadFile = (file, filename) => {
	return new Promise((resolve, reject) => {
		authenticate().then((token) => {
			return token;

		}).then(token => {
			const options = {
				method: 'POST',
				url: 'https://foo.k8rnd.vatbox.com/api/imaginary/v1.0/asset',
				headers:
					{
						'cache-control': 'no-cache',
						Connection: 'keep-alive',
						'Accept-Encoding': 'gzip, deflate',
						Host: 'foo.k8rnd.vatbox.com',
						'x-vatbox-token': token,
					},
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

		})

	}).catch(error => console.error(error));


};
module.exports = {
	imaginary: {
		uploadFile,
		authenticate
	}
};
