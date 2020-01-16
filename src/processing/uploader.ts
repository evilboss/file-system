// @ts-ignore
const AWS = require('aws-sdk');
// @ts-ignore
const fs = require('fs');
// @ts-ignore

const {accessKeyId, secretAccessKey, region} = require(`${process.env.PWD}/aws.s3.config.json`);
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
// @ts-ignore
const uploadFile = (targetFile, fileName, buketName) => {
  // Read content from the file
  buketName = buketName ? buketName : 'ingestion-ph-dev-fake-imaginary';
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
  // @ts-ignore
  s3.upload(params, (err, data) => {
    if (err) {
      return err;
    } else {
      // @ts-ignore
      fs.unlink(targetFile, err => {
        if (err) return err;
        // if no error, file has been deleted successfully
      });
      console.log(targetFile, fileName, buketName, `File uploaded successfully. ${data.Location}`);
      return `File uploaded successfully. ${data.Location}`;
    }

  });
};
//usage
/*uploadFile('./storage/realfile1.txt', 'accountname/realfile1.txt');
*/
// @ts-ignore
module.exports = {uploadFile};
