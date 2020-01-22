const {imaginary} = require('./imaginary');
imaginary.uploadFile('./testStorage/DATA_Ingestion/doc.pdf','sample.pdf').then((result, error) => {
	console.log(result, error);
});
