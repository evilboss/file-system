/* istanbul ignore file */
// @ts-ignore
const AWS = require('aws-sdk');
// @ts-ignore
const fs = require('fs');
// @ts-ignore
const {S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, NODE_ENV} = process.env;
const params = {
	Bucket: S3_BUCKET,
	CreateBucketConfiguration: {
		// Set your region here
		LocationConstraint: "eu-west-1"
	}
};
const s3 = new AWS.S3({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY
});

// @ts-ignore
const uploadFile = (targetFile, fileName, buketName = S3_BUCKET) => {
	// Read content from the file
	if (!targetFile && !fileName) {
		console.error('targetFile and targetfilename required to upload file');
		return 'targetFile and fileName required to upload file';
	}
	const fileContent = fs.readFileSync(targetFile);
	// Setting up S3 upload parameters
	const params = {
		Bucket: S3_BUCKET,
		Key: fileName, // File name you want to save as in S3
		Body: fileContent
	};

	// Uploading files to the bucket
	// @ts-ignore
	console.log(targetFile, fileName);
	if (NODE_ENV !== 'local') {
		// @ts-ignore
		s3.upload(params, (err, data) => {
			if (err) {
				console.error(err);
			} else {
				// @ts-ignore
				fs.unlink(targetFile, err => {
					if (err) console.error(err);
					// if no error, file has been deleted successfully
				});
				console.log(`File uploaded successfully. ${data.Location}`);
			}

		});

	}
};
//usage
/*uploadFile('./storage/realfile1.txt', 'accountname/realfile1.txt');
*/
// @ts-ignore
module.exports = {uploadFile: uploadFile};
