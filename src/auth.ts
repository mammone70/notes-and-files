import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';
import type { Adapter } from 'next-auth/adapters';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET){
    throw new Error('Missing Google oauth credentials');
}

export const {
    GET,
    POST, 
    auth, 
    signOut, 
    signIn 
} = NextAuth({
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        //might need
        // async session ({ session, user }: any) {
        //     if(session && user){
        //         session.user.id = user.id;
        //     }
        //     return session;
        // }
    }
})