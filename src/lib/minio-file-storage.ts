// Create a new Minio client with the S3 endpoint, access key, and secret key
import * as Minio from 'minio'
import { env } from 'process'

export const s3Client = new Minio.Client({
    endPoint: env.S3_ENDPOINT ? env.S3_ENDPOINT : '127.0.0.1',
    port: env.S3_PORT ? Number(env.S3_PORT) : undefined,
    accessKey: env.S3_ACCESS_KEY ? env.S3_ACCESS_KEY : '',
    secretKey: env.S3_SECRET_KEY ? env.S3_SECRET_KEY : '',
    useSSL: env.S3_USE_SSL === 'true',
  })
   
//   export async function createBucketIfNotExists(bucketName: string) {
//     const bucketExists = await s3Client.bucketExists(bucketName)
//     if (!bucketExists) {
//       await s3Client.makeBucket(bucketName)
//     }
//   }