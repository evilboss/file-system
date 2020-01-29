const AWS = require('aws-sdk');
const config = require('./appConfig');
const {AWS_KEY, AWS_SECRET, S3_BUCKET} = process.env;
const S3 = new AWS.S3();

const bucketName = S3_BUCKET;
(async () => {
	try {
		const data = await S3.headBucket({Bucket: bucketName}).promise();
		return `Bucket "${bucketName}" exists`
	} catch (err) {
		if (err.statusCode >= 400 && err.statusCode < 500) {
			return `Bucket "${bucketName}" not found`
		}
		throw err
	}
})();
