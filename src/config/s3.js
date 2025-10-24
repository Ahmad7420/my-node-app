import AWS from "aws-sdk";
import "dotenv/config";

const s3 = new AWS.S3({
  accessKeyId: process.env.IDRIVE_ACCESS_KEY,
  secretAccessKey: process.env.IDRIVE_SECRET_KEY,
  endpoint: process.env.IDRIVE_ENDPOINT, // e.g. https://xxxxx.idrivee2-xxxx.linodeobjects.com
  s3ForcePathStyle: true, // required for iDrive
  signatureVersion: "v4",
  region: "us-east-1",
});

export default s3;
