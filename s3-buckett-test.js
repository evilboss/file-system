const AWS = require('aws-sdk');
const config = require('./appConfig');
const {AWS_KEY, AWS_SECRET, S3_BUCKET} = process.env;
const S3 = new AWS.S3({
	accessKeyId: AWS_KEY,
	secretAccessKey: AWS_SECRET
});

const bucketName = S3_BUCKET;
(async () => {
	try {
		const data = await S3.headBucket({Bucket: bucketName}).promise();
		console.log(`Bucket "${bucketName}" exists`);
		return `Bucket "${bucketName}" exists`
	} catch (err) {
		if (err.statusCode >= 400 && err.statusCode < 500) {
			console.log(`Bucket "${bucketName}" not found`);
			return `Bucket "${bucketName}" not found`
		}
		throw err
	}
})().catch(err => {
	console.error(err);
});
