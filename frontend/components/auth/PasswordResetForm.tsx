"use client";

import React, { useActionState } from "react";
import { resetPasswordAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "./PasswordInput";

const PasswordResetForm = ({ token }: { token: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialState: ResetPasswordInitialState = {
        data: {},
        error: {},
        success: false,
    };
    const [state, formAction, isPending] = useActionState(
        resetPasswordAction,
        initialState
    );

    if (state.success) {
        router.push("/login");
        return null;
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="token" value={token} />
            {state.error?.data?.token && (
                <p className="text-red-500">{state.error.data.token}</p>
            )}
            <div className="grid gap-2">
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        id="email"
                        defaultValue={
                            state.data?.email ||
                            (searchParams.get("email") as string)
                        }
                        className={state.error?.data?.email && "border-red-500"}
                        aria-invalid={!!state.error?.data?.email}
                        aria-describedby={
                            state.error?.data?.email ? "email-error" : undefined
                        }
                        required
                    />
                    {state.error?.data?.email && (
                        <p className="text-red-500">{state.error.data.email}</p>
                    )}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        name="password"
                        id="password"
                        className={
                            state.error?.data?.password && "border-red-500"
                        }
                        aria-invalid={!!state.error?.data?.password}
                        aria-describedby={
                            state.error?.data?.password
                                ? "password-error"
                                : undefined
                        }
                        placeholder="********"
                        required
                    />
                    {state.error?.data?.password && (
                        <p className="text-red-500">
                            {state.error.data.password}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="passwordConfirmation">
                        Confirm Password
                    </Label>
                    <PasswordInput
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        placeholder="********"
                        required
                    />
                </div>
                <Button className="mt-2" disabled={isPending}>
                    {isPending ? "Reset Password..." : "Reset Password"}
                </Button>
            </div>
        </form>
    );
};

export default PasswordResetForm;
