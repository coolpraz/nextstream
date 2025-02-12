"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { forgotPasswordAction } from "@/actions/auth";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

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
        <form action={formAction} className="space-y-6">
            {state.data?.status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {state.data.status}
                </div>
            )}

            <div className="space-y-4">
                <div className="relative">
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={state.data?.email || ""}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 bg-[#2c2c2e]/50 rounded-xl text-white placeholder:text-gray-500 transition-all ${
                            state.error?.data?.email
                                ? "border-red-500 focus:ring-red-500 focus:ring-2"
                                : "border-0 focus:ring-[#4dabf7] focus:ring-2"
                        }`}
                        aria-invalid={!!state.error?.data?.email}
                        aria-describedby={
                            state.error?.data?.email ? "email-error" : undefined
                        }
                        required
                        autoFocus
                    />
                </div>
                {state.error?.data?.email && (
                    <p className="text-red-500">{state.error.data.email}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-[#4dabf7] hover:bg-[#3b8fd7] text-white font-semibold py-3 rounded-xl transition-colors"
                disabled={isPending}
            >
                {isPending ? "Continue..." : "Continue"}
                <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
        </form>
    );
};

export default ForgotPasswordForm;
