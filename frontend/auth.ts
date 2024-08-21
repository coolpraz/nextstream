import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchData } from "@/lib/fetch";
import { CustomError } from "@/lib/CustomError";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const res = await fetchData({
                    path: "/api/login",
                    method: "POST",
                    formData: credentials,
                    additionalOptions: { cache: "no-store" },
                });

                if (!res.ok) {
                    const errorMessage = await res.json();
                    throw new CustomError(
                        errorMessage.message || "An error occurred",
                        errorMessage?.errors
                    );
                }

                const response = await res.json();
                const user = response?.user;

                return user;
            },
        }),
    ],
});
