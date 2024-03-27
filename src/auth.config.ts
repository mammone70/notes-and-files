import Credentials from "@auth/core/providers/credentials";
import type { NextAuthConfig } from "next-auth"

import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
export default {
  providers: [
    Credentials({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials);

            if(validatedFields.success){
                const { email, password } = validatedFields.data;

                const user = await getUserByEmail(email);
                
                //logged in with an OAuth provider, not credentials
                if(!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (passwordsMatch) return user;
            }

            return null;
        }
    })
  ],
} satisfies NextAuthConfig