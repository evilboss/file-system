const request = require('request');
const options = {
	method: 'GET',
	url: 'http://imaginary/api/exposed/v1.0/asset/5dca89d740000025d84b6b41/info',
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
	console.log(body);
});
