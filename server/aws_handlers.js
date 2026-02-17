import { PutObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";
import { error } from "node:console";

export const awsImageUpload = async (req, res, bucket, key, file) => {
  // set up new aws s3 client
  const client = new S3Client({ region: process.env.AWS_REGION });

  const uploadParams = {
    Bucket: bucket,
    Key: await key(), // Leave it empty for now
    Body: file,
  };

  try {
    console.log("****************aws function logged");
    // Upload file to AWS S3 database
    const command = new PutObjectCommand(uploadParams);
    const response = await client.send(command);
    console.log(`AWS fn response: ${response}`);
    // console.log(`IMAGE UPLOADED (aws handler): ${employeeInfo.image}`);
  } catch (err) {
    if (err instanceof S3ServiceException && err.name === "EntityTooLarge") {
      console.error(
        `Error from S3 while uploading object to ${process.env.AWS_BUCKET_NAME}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`,
      );
    } else if (err instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to ${process.env.AWS_BUCKET_NAME}.  ${err.name}: ${err.message}`,
      );
    } else {
      console.log(`something went wrong with aws upload ${err}`);
      throw error;
    }
  }
};
