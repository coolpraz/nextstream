import React from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

const ForgotPage = () => {
    return (
        <>
            <div className="flex flex-col mb-2 space-y-2 text-left">
                <h1 className="font-semibold tracking-tight text-md">
                    Forgot Password
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your registered email and <br /> we will send you a
                    link to reset your password.
                </p>
            </div>
            <ForgotPasswordForm />
            <p className="px-8 mt-4 text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Register
                </Link>
                .
            </p>
        </>
    );
};

export default ForgotPage;
