const {imaginary} = require('./imaginary');
imaginary.uploadFile().then((result, error) => {
	console.log(result, error);
});
