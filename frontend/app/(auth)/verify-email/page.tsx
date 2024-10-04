"use client";

import { sendVerificationEmail } from "@/actions/auth";
import AuthCard from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useActionState } from "react";

const VerifyEmail = () => {
    const initialState: VerificationState = {
        status: "",
        error: {},
    };
    const [state, formAction, isPending] = useActionState(
        sendVerificationEmail,
        initialState
    );

    const verificationLinkSent = state?.status === "verification-link-sent";

    return (
        <AuthCard
            title="Verify Your Email"
            description="Before continuing, could you verify your email address by
                clicking on the link we just emailed to you? If you didn't
                receive the email, we will gladly send you another."
        >
            <div className="space-y-4">
                {verificationLinkSent && (
                    <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                        A new verification link has been sent to the email
                        address you provided in your profile settings.
                    </div>
                )}

                <form action={formAction}>
                    <Button disabled={isPending} className="w-full uppercase">
                        {isPending
                            ? "Resending Verification Email..."
                            : "Resend Verification Email"}
                    </Button>
                </form>
                <div className="flex justify-between">
                    <Link
                        href="/profile"
                        className="font-medium text-primary hover:underline"
                    >
                        Edit Profile
                    </Link>

                    <button
                        onClick={() => signOut()}
                        className="font-medium text-primary hover:underline"
                    >
                        Log Out
                    </button>
                </div>

                {state?.error?.message && (
                    <p className="justify-between mt-2 text-center text-red-500">
                        {state.error.message}
                    </p>
                )}
            </div>
        </AuthCard>
    );
};

export default VerifyEmail;
