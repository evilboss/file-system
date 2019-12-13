const AWS = require('aws-sdk');
const fs = require('fs');

const {accessKeyId, secretAccessKey, region} = require('./aws.s3.config.json');
const params = {
	Bucket: 'testbucketingestion',
	CreateBucketConfiguration: {
		// Set your region here
		LocationConstraint: region
	}
};
const s3 = new AWS.S3({
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey
});


const upload = () => {


};
const uploadFile = (targetFile, fileName) => {
	// Read content from the file
	const fileContent = fs.readFileSync(targetFile);

	// Setting up S3 upload parameters
	const params = {
		Bucket: 'testbucketingestion',
		Key: fileName, // File name you want to save as in S3
		Body: fileContent
	};

	// Uploading files to the bucket
	s3.upload(params, (err, data) => {
		if (err) {
			throw err;
		}
		console.log(`File uploaded successfully. ${data.Location}`);
	});
};
uploadFile('./storage/realfile1.txt', 'accountname/realfile1.txt');
