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

const uploadFile = (targetFile, fileName, buketName = 'ingestion-ph-dev-secondary') => {
	// Read content from the file
	if (!targetFile && !fileName) {
		console.error('targetFile and targetfilename required to upload file');
		return 'targetFile and fileName required to upload file';
	}
	const fileContent = fs.readFileSync(targetFile);
	// Setting up S3 upload parameters
	const params = {
		Bucket: buketName,
		Key: fileName, // File name you want to save as in S3
		Body: fileContent
	};

	// Uploading files to the bucket
	s3.upload(params, (err, data) => {
		if (err) {
			throw err;
		} else {
			fs.unlink(targetFile, err => {
				if (err) throw err;
				// if no error, file has been deleted successfully
			});
			console.log(`File uploaded successfully. ${data.Location}`);
		}

	});
};
//usage
/*uploadFile('./storage/realfile1.txt', 'accountname/realfile1.txt');
*/
module.exports = {uploadFile};
