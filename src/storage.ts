import { Storage } from "@google-cloud/storage"

export const bucketName = "water-meter";
const client = new Storage();


export const removeFileFromBucket = async (fileName) => {
  await client.bucket(bucketName).file(fileName).delete();
}
