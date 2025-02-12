"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";

const LoginForm = () => {
    const router = useRouter();
    const initialState: LoginInitialState = {
        data: {},
        error: {},
        success: false,
    };
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState
    );

    if (state?.success) {
        router.push("/dashboard");
        return null;
    }

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <Input
                        name="email"
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 bg-[#2c2c2e]/50 border-0 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4dabf7] transition-all ${
                            state.error?.data?.email ? "border-red-500" : ""
                        }`}
                        defaultValue={state.data?.email || ""}
                        aria-invalid={!!state.error?.data?.email}
                        aria-describedby={
                            state.error?.data?.email ? "email-error" : undefined
                        }
                        placeholder="Email"
                        required
                        autoFocus
                    />
                    {state.error?.data?.email && (
                        <p className="text-red-500">{state.error.data.email}</p>
                    )}
                </div>
                <div className="relative">
                    <Input
                        name="password"
                        id="password"
                        type="password"
                        className={`w-full px-4 py-3 bg-[#2c2c2e]/50 border-0 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4dabf7] transition-all pr-12 ${
                            state.error?.data?.password && "border-red-500"
                        }`}
                        aria-invalid={!!state.error?.data?.password}
                        aria-describedby={
                            state.error?.data?.password
                                ? "password-error"
                                : undefined
                        }
                        placeholder="Password"
                    />
                    <div className="absolute -translate-y-1/2 right-2 top-1/2">
                        {isPending ? (
                            <Loader className="w-5 h-5 text-gray-400 animate-spin" />
                        ) : (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-gray-400 transition-colors hover:text-white"
                                type="submit"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                </div>
                {state.error?.data?.password && (
                    <p className="text-red-500">{state.error.data.password}</p>
                )}
            </div>

            <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        className="border-gray-600 data-[state=checked]:bg-[#4dabf7] data-[state=checked]:border-[#4dabf7]"
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm text-gray-300 cursor-pointer"
                    >
                        Keep me signed in
                    </label>
                </div>
            </div>

            <div className="space-y-3 text-center">
                <Link
                    href="/forgot-password"
                    className="block text-sm text-[#4dabf7] hover:text-[#74c0ff] transition-colors"
                >
                    Forgot password?
                </Link>
                <Link
                    href="/register"
                    className="block text-sm text-[#4dabf7] hover:text-[#74c0ff] transition-colors"
                >
                    Create NextStream Account
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
