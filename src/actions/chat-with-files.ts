'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { ChatSchema } from "@/schemas";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { FileSection, Prisma } from "@prisma/client";
import * as z from "zod";
import { ReturnProps } from "@/actions/return-props";

export const chatWithFiles = 
    async (values: z.infer<typeof ChatSchema>) : Promise<ReturnProps> => {
        const session = await auth();
        if(!session){
            return { error : "Not authorized to call this action." };
        }
        
        const validateFields = ChatSchema.safeParse(values);

        if (!validateFields.success){
            return { error: "Invalid fields!" };
        }

        const { message, conversation } = validateFields.data;
        
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
        
        const result = await vectorStore.similaritySearch(message, 3);

        return { 
            response: JSON.stringify(result), 
        };
    }

