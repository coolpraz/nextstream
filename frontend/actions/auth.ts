"use server";

import { auth, signIn, unstable_update } from "@/auth";
import { CustomError } from "@/lib/CustomError";
import { fetchData } from "@/lib/fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginAction = async (
    prevState: LoginInitialState,
    formData: FormData
): Promise<LoginInitialState> => {
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
            success: true,
        };
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
            success: false,
        };
    }
};

export const registerAction = async (
    prevState: RegisterInitialState | null,
    formData: FormData
): Promise<RegisterInitialState> => {
    try {
        const { name, email, password, passwordConfirmation } =
            Object.fromEntries(formData.entries());

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

        if (res?.status == 200) {
            await signIn("credentials", { email, password, redirect: false });
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            data: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
            },
            error: {
                message: error.message || "An error occurred during sign in",
                data: error.data || {},
            },
            success: false,
        };
    }
};

export const forgotPasswordAction = async (
    prevState: ForgotPasswordInitialState,
    formData: FormData
) => {
    const email = formData.get("email");

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
                token,
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
                token,
            },
            error: {
                message: error.message || "An error occurred during sign in",
                data: error.data || {},
            },
            success: false,
        } as ResetPasswordInitialState;
    }
};

export const sendVerificationEmail = async (): Promise<ResendState> => {
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

        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            error: {
                message: error.message,
            },
        };
    }
};

export const verifyAction = async (
    _prevState: any,
    formData: FormData
): Promise<VerifyState> => {
    const session = (await auth()) as CustomSession;
    if (!session?.user) return null;

    const rawData = Object.fromEntries(formData.entries());

    const code = [
        rawData["code-0"],
        rawData["code-1"],
        rawData["code-2"],
        rawData["code-3"],
        rawData["code-4"],
        rawData["code-5"],
    ].join("");

    try {
        const res = await fetchData({
            path: "/verify-email",
            method: "POST",
            formData: { code },
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            },
        });

        if (!res.ok) {
            const errorMessage = await res.json();
            throw new CustomError(
                errorMessage.message || "An error occurred",
                errorMessage?.error
            );
        }

        // If verification was successful, update the session
        await unstable_update({
            ...session.user,
            needsVerification: false,
        });
    } catch (error: any) {
        return {
            error: {
                message: error.message || "An error occurred during sign in",
                data: error.data || {},
            },
            success: false,
        };
    }

    // Revalidate the dashboard page and redirect outside of try-catch
    revalidatePath("/verify-email");
    revalidatePath("/dashboard");
    redirect("/dashboard");
};
