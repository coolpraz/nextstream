"use client"

import React, { useActionState } from "react";
import { Button } from "../ui/button";
import { forgotPasswordAction } from "@/actions/auth";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ForgotPasswordForm = () => {
    const initialState: ForgotPasswordInitialState = {
        data: {},
        error: {},
    };
    const [state, formAction, isPending] = useActionState(
        forgotPasswordAction,
        initialState
    );
    return (
        <>
            {state.data?.status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {state.data.status}
                </div>
            )}
            <form action={formAction}>
                <div className="grid gap-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            type="email"
                            id="email"
                            defaultValue={state.data?.email || ""}
                            className={
                                state.error?.data?.email && "border-red-500"
                            }
                            aria-invalid={!!state.error?.data?.email}
                            aria-describedby={
                                state.error?.data?.email
                                    ? "email-error"
                                    : undefined
                            }
                            placeholder="name@example.com"
                            required
                            autoFocus
                        />
                        {state.error?.data?.email && (
                            <p className="text-red-500">
                                {state.error.data.email}
                            </p>
                        )}
                    </div>
                        <Button className="mt-2" disabled={isPending}>
                            {isPending
                                ? "Continue..."
                                : "Continue"}
                        </Button>
                </div>
            </form>
        </>
    );
};

export default ForgotPasswordForm;
