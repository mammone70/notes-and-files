import { db } from "@/db";

// export const createFile = async () => {
//     await db.file.create({
        
//     })
// }

export const getAllFiles = async () => {
    return await db.file.findMany();
}