import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

//global scope not effected by Hot Reload in dev environment
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;