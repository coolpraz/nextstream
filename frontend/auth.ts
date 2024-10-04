import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchData } from "@/lib/fetch";
import { CustomError } from "@/lib/CustomError";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    pages: {
        signIn: "/login",
        verifyRequest: "/verify-email",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthPage =
                nextUrl.pathname.startsWith("/login") ||
                nextUrl.pathname.startsWith("/register");
            const needsVerification = auth?.user?.needsVerification;

            const isVerifyEmailPage =
                nextUrl.pathname.startsWith("/verify-email");

            // Redirect to dashboard if logged in and verified, trying to access auth pages or verify-email
            if (
                isLoggedIn &&
                !needsVerification &&
                (isAuthPage || isVerifyEmailPage)
            ) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            // Redirect to verify-email page if logged in and needs verification
            if (isLoggedIn && needsVerification && !isVerifyEmailPage) {
                return Response.redirect(new URL("/verify-email", nextUrl));
            }

            // Prevent access to verify-email page if not logged in or already verified
            if (isVerifyEmailPage && (!isLoggedIn || !needsVerification)) {
                return Response.redirect(new URL("/login", nextUrl));
            }

            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.user = user;
            }

            // Handle email verification update
            if (trigger === "update") {
                const freshUser = await getUser(session.token);

                if (freshUser?.email_verified_at && token.user !== null) {
                    token.user = {
                        ...token.user,
                        email_verified_at: freshUser.email_verified_at,
                        needsVerification: session.needsVerification,
                    };
                }

                return token;
            }

            return token;
        },
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
    },
    events: {
        async signOut({ token }: any) {
            // Perform any additional sign-out logic here
            try {
                await fetchData({
                    path: "/logout",
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token.user.token}`,
                    },
                });
            } catch (error) {
                console.error("Error during sign-out:", error);
            }
        },
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const res = await fetchData({
                    path: "/login",
                    method: "POST",
                    formData: credentials,
                });

                if (!res.ok) {
                    if (res.status == 409) {
                        const response = await res.json();
                        const user = response?.user;
                        return { ...user, needsVerification: true };
                    }
                    const errorMessage = await res.json();
                    throw new CustomError(
                        errorMessage.message || "An error occurred",
                        errorMessage?.errors
                    );
                }

                const response = await res.json();
                const user = response?.user;

                return { ...user, needsVerification: false };
            },
        }),
    ],
});

async function getUser(token: string): Promise<CustomUser | null> {
    try {
        const res = await fetchData({
            path: "/user",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new CustomError(
                errorMessage.message || "Failed to fetch user data",
                errorMessage?.errors
            );
        }

        const userData = await res.json();
        return userData as CustomUser;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
