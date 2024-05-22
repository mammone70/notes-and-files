import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import { db } from '@/db';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';

// export type ExtendedUser = DefaultSession["user"] & 

declare module "next-auth" {
    interface Session {
        user: {
            role: "ADMIN" | "USER"
        } & DefaultSession["user"]
    }
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
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    adapter: PrismaAdapter(db),
    session: { 
        strategy: "jwt",
        maxAge: 900, //15 minutes
    },
    ...authConfig,
    callbacks: {
        async signIn({ user, account }) {
            //allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            if(user && user.id){
                const existingUser = await getUserById(user.id);
                
                //prevent sign in without email verification
                if(existingUser && existingUser.emailVerified){
                    if(existingUser.isTwoFactorEnabled) {
                        const twoFactorConfirmation = 
                            await getTwoFactorConfirmationByUserId(existingUser.id);
                            
                        if (!twoFactorConfirmation) return false;

                        //Delete 2FA for next sign in
                        await db.twoFactorConfirmation.delete({
                            where: { id: twoFactorConfirmation.id },
                        });
    
                        //TODO add time period users don't need to use 2FA
                        //TODO track 2FA by device
                    }
                    
                    return true;
                } else {
                    return false;
                }
            }

            return false;
        },
        async session({token, session, user}){
            //usually not needed, fixing a bug in nextauth
            if(session && user) {
                session.user.id = user.id;
            }

            if(token.sub && session.user){
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({ token }) {
           //not logged in
            if(!token.sub) return token;
            
            //token.exp = Math.round(Date.now() / 1000) + 900;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token; //new user

            token.role = existingUser.role;
            
            return token;
        },
    }
});