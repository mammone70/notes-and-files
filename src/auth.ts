import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';
import type { Adapter } from 'next-auth/adapters';
import authConfig from '@/auth.config';
import { Prisma } from '@prisma/client';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET){
    throw new Error('Missing Google oauth credentials');
}

export const {
    handlers: {
        GET,
        POST, 
    },
    auth, 
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,
    callbacks: {
        //might need
        // async session ({ session, user }: any) {
        //     if(session && user){
        //         session.user.id = user.id;
        //     }
        //     return session;
        // }
    }
});