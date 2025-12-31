import { PutObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";
import { readFile, filePath } from "node:fs/promises";

export const awsImageUpload = async ({ bucket, key, file }) => {
  // set up new aws s3 client
  const client = new S3Client({});

  const uploadParams = new PutObjectCommand({
    Bucket: bucket,
    Key: await key(), // Leave it empty for now
    Body: await readFile(file),
  });

  try {
    // Upload file to AWS S3 database
    const response = await client.send(uploadParams);
    console.log(response);
  } catch {
    if (err instanceof S3ServiceException && err.name === "EntityTooLarge") {
      console.error(
        `Error from S3 while uploading object to ${process.env.AWS_BUCKET_NAME}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`
      );
    } else if (err instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to $${process.env.AWS_BUCKET_NAME}.  ${err.name}: ${err.message}`
      );
    } else {
      throw err;
    }
  }
};
