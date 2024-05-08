'use server';

import { UploadFileSchema } from "@/schemas";

import * as z from "zod";

export const uploadFile = async (values: z.infer<typeof UploadFileSchema>) => {
    const validateFields = UploadFileSchema.safeParse(values);

    if (!validateFields.success){
        return { error: "Invalid fields!" };
    }

    const { file, title } = validateFields.data;

}