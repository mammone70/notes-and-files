'use server';

import { auth } from "@/auth";
import { ChatSchema } from "@/schemas";
import * as z from "zod";

export const chatWithFiles = async (values: z.infer<typeof ChatSchema>) => {
    const session = await auth();
    if(!session){
        return;
    }
    
    const validateFields = ChatSchema.safeParse(values);

    if (!validateFields.success){
        return { error: "Invalid fields!" };
    }

    return { response: "Chat Response!" };
}

