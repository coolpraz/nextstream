import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            needsVerification: boolean;
            // ...other properties
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        needsVerification: boolean;
        // ...other properties
    }
}
