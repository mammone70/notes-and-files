// Create a new Minio client with the S3 endpoint, access key, and secret key
import * as Minio from 'minio'
import { env } from 'process'
import internal from 'stream'

export const s3Client = new Minio.Client({
    endPoint: env.S3_ENDPOINT ? env.S3_ENDPOINT : '127.0.0.1',
    port: env.S3_PORT ? Number(env.S3_PORT) : undefined,
    accessKey: env.S3_ACCESS_KEY ? env.S3_ACCESS_KEY : '',
    secretKey: env.S3_SECRET_KEY ? env.S3_SECRET_KEY : '',
    useSSL: env.S3_USE_SSL === 'true',
  })
   
export async function createBucketIfNotExists(bucketName: string) {
    const bucketExists = await s3Client.bucketExists(bucketName)
    if (!bucketExists) {
        await s3Client.makeBucket(bucketName)
    }
}

/**
 * Save file in S3 bucket
 * @param bucketName name of the bucket
 * @param fileName name of the file
 * @param file file to save
 */
export async function saveFileInBucket({
    bucketName,
    fileName,
    file,
  }: {
    bucketName: string
    fileName: string
    file: Buffer | internal.Readable
  }) {
    // Create bucket if it doesn't exist
    await createBucketIfNotExists(bucketName)
   
    // check if file exists - optional.
    // Without this check, the file will be overwritten if it exists
    const fileExists = await checkFileExistsInBucket({
      bucketName,
      fileName,
    })
   
    if (fileExists) {
      throw new Error('File already exists')
    }
   
    // Upload image to S3 bucket
    await s3Client.putObject(bucketName, fileName, file)
  }
   
/**
 * Check if file exists in bucket
 * @param bucketName name of the bucket
 * @param fileName name of the file
 * @returns true if file exists, false if not
 */
export async function checkFileExistsInBucket({ bucketName, fileName }: { bucketName: string; fileName: string }) {
try {
    await s3Client.statObject(bucketName, fileName)
} catch (error) {
    return false
}
return true
}