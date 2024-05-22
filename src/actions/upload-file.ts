'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

import { saveFileInBucket } from "@/lib/minio-file-storage";
// import { UploadFileSchema } from "@/schemas";
import { FileSection, FileType, Prisma } from "@prisma/client";

import * as z from "zod";

import ollama from 'ollama'
import { OllamaEmbeddings} from "@langchain/community/embeddings/ollama";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";

// export const uploadFile = async (values: z.infer<typeof UploadFileSchema>) => {
export const uploadFile = async (formData: FormData) => {
    const session = await auth();
    if(!session){
        return;
    }
    
    // const validateFields = UploadFileSchema.safeParse(values);

    // if (!validateFields.success){
    //     return { error: "Invalid fields!" };
    // }

    const files = formData.getAll("files") as File[];
    const title = formData.get("title");
    
    //if any Promise fails, rollback everything
    // Promise.all(
    //     files.map(async (file) => {
            
            //upload files to bucket
            const fileBuffer = Buffer.from(await files[0]?.arrayBuffer());  
            // await saveFileInBucket({
            //     bucketName: "test-bucket",
            //     fileName: file.name,
            //     file: fileBuffer,
            // });

            //save file info to database
            //TODO do this in a batch db call

            //split pdf
            const loader = new WebPDFLoader(new Blob([fileBuffer]));
            const docs = await loader.load();
            
            const vectorStore = PrismaVectorStore.withModel<FileSection>(db).create(
                new OllamaEmbeddings({
                    model: 'nomic-embed-text:latest',
                    baseUrl: "http://localhost:11434",
                }),
                {
                    prisma: Prisma,
                    tableName: "FileSection",
                    vectorColumnName: "embedding",
                    columns: {
                        id: PrismaVectorStore.IdColumn,
                        content: PrismaVectorStore.ContentColumn,
                    },
                }
            );

            const dbFile = await db.file.create({
                data: {
                    fileType: FileType.PDF,
                    name: files[0].name,
                    bucketName: "test-bucket",
                    user: {
                        connect: { 
                            id : session.user.id
                        },
                    },
                }
            });

            //TODO make sure file got inserted

            await vectorStore.addModels(
                await db.$transaction([
                    db.fileSection.create({
                        data: { 
                            content: docs[0].pageContent,
                            fileId: dbFile.id,
                        } 
                    })
                ])
            )

            // const fileSections = [];

            // for(let doc of docs) {
                // const response = await ollama.embeddings({
                //     model: 'nomic-embed-text',
                //     prompt: docs[0].pageContent,
                // });

                // fileSections.push({
                //     content: docs[0].pageContent,
                //     embedding: response.embedding,
                // })
            // }
            
            // console.log(response.embedding);
               
            console.log(dbFile);
    // }));
}