import s3 from "../config/s3.js";

export const getPreSignedUrl = async (uploadParams) => {
  const objectKey = uploadParams.Key;

  const signedUrl = s3.getSignedUrl("getObject", {
    Bucket: uploadParams.Bucket,
    Key: objectKey,
    Expires: 60 * 60 * 24 * 7,
  });

  return signedUrl;
};
