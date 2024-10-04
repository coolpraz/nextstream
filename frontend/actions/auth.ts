"use server";

import { auth, signIn, unstable_update } from "@/auth";
import { CustomError } from "@/lib/CustomError";
import { fetchData } from "@/lib/fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginAction = async (
    prevState: LoginInitialState,
    formData: FormData
) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return {
            data: {
                email: email,
                password: "",
            },
            error: {
                message: "",
                data: {},
            },
            success: true
        } as LoginInitialState;
    } catch (error: any) {
        return {
            data: {
                email: email,
                password: "",
            },
            error: {
                message:
                    error.cause?.err.message ||
                    "An error occurred during sign in",
                data: error.cause?.err.data || {},
            },
            success: false
        } as LoginInitialState;
    }
};

export const registerAction = async (
    prevState: RegisterInitialState,
    formData: FormData
) => {
    const { name, email, password, passwordConfirmation } = Object.fromEntries(
        formData.entries()
    );

    try {
        const res = await fetchData({
            path: "/register",
            method: "POST",
            formData: {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new CustomError(
                errorMessage.message || "An error occurred",
                errorMessage?.errors
            );
        }

        await signIn("credentials", { email, password, redirect: false });

        return {
            data: {},
            error: {
                message: "",
                data: {},
            },
            success: true
        } as RegisterInitialState;
    } catch (error: any) {
        return {
            data: {
                name,
                email,
                password: "",
                passwordConfirmation: "",
            },
            error: {
                message:
                    error.message ||
                    "An error occurred during sign in",
                data: error.data || {},
            },
            success: false
        } as RegisterInitialState;
    }
};

export const forgotPasswordAction = async (
    prevState: ForgotPasswordInitialState,
    formData: FormData
) => {
    const email = formData.get('email');

    try {
        const res = await fetchData({
            path: "/forgot-password",
            method: "POST",
            formData: { email },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new CustomError(
                errorMessage.message || "An error occurred",
                errorMessage?.errors
            );
        }

        return {
            data: await res.json(),
            error: {
                message: "",
                data: {},
            },
        } as ForgotPasswordInitialState;
    } catch (error: any) {
        return {
            data: { email },
            error: {
                message: error.message || "An error occurred",
                data: error.data || {},
            },
        } as ForgotPasswordInitialState;
    }
};

export const resetPasswordAction = async (
    prevState: RegisterInitialState,
    formData: FormData
) => {
    const { email, password, passwordConfirmation, token } = Object.fromEntries(
        formData.entries()
    );

    try {
        const res = await fetchData({
            path: "/reset-password",
            method: "POST",
            formData: {
                email,
                password,
                password_confirmation: passwordConfirmation,
                token
            },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new CustomError(
                errorMessage.message || "An error occurred",
                errorMessage?.errors
            );
        }

        return {
            data: {},
            error: {
                message: "",
                data: {},
            },
            success: true,
        } as ResetPasswordInitialState;
    } catch (error: any) {
        return {
            data: {
                email,
                password: "",
                passwordConfirmation: "",
                token
            },
            error: {
                message: error.message || "An error occurred during sign in",
                data: error.data || {},
            },
            success: false,
        } as ResetPasswordInitialState;
    }
};

export const sendVerificationEmail = async () => {
    const session = (await auth()) as CustomSession;
    if (!session?.user) return null;

    try {
        const res = await fetchData({
            path: "/email/verification-notification",
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new CustomError(
                errorMessage.message || "An error occurred",
                errorMessage?.errors
            );
        }

        return {
            status: "verification-link-sent",
        } as VerificationState;
    } catch (error: any) {
        return {
            status: "failed",
            error: {
                message: error.message
            }
        } as VerificationState;
    }

};

export const validateAction = async (
    _prevState: any,
    formData: FormData
) => {
    const session = (await auth()) as CustomSession;
    if (!session?.user) return null;

    const { id, token, expires, signature } = Object.fromEntries(
        formData.entries()
    );

    const combinedHash = `${token}?expires=${expires}&signature=${signature}`;

    try {
        const res = await fetchData({
            path: `/verify-email/${id}/${combinedHash}`,
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new CustomError(
                errorMessage.message || "An error occurred",
                errorMessage?.errors
            );
        }

        // If verification was successful, update the session
        await unstable_update({
            ...session.user,
            needsVerification: false,
        } as Partial<CustomSession>);
    } catch (error: any) {
        console.log(error.message);
    }

    // Revalidate the dashboard page and redirect outside of try-catch
    revalidatePath("/verify-email");
    revalidatePath("/dashboard");
    redirect("/dashboard");
};
