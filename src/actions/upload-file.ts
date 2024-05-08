'use server';

import { saveFileInBucket } from "@/lib/minio-file-storage";
import { UploadFileSchema } from "@/schemas";

import * as z from "zod";


// export const uploadFile = async (values: z.infer<typeof UploadFileSchema>) => {
export const uploadFile = async (formData: FormData) => {
    // const validateFields = UploadFileSchema.safeParse(values);

    // if (!validateFields.success){
    //     return { error: "Invalid fields!" };
    // }

    const files = formData.getAll("files") as File[];
    const title = formData.get("title");
    
    Promise.allSettled(
        files.map(async (file) => {
            const fileBuffer = Buffer.from(await files[0]?.arrayBuffer());  
            return await saveFileInBucket({
                bucketName: "test-bucket",
                fileName: file.name,
                file: fileBuffer,
              });
    }))
    .then(
        (results) => results
            .forEach(
                (result) => {
                    console.log(result.status);
                }
        )
    );
}