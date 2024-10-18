"use client";

import { loginAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/auth/PasswordInput";

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
        <form action={formAction}>
            <div className="grid gap-2">
                {/* Email field */}
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        id="email"
                        defaultValue={state.data?.email || ""}
                        className={state.error?.data?.email && "border-red-500"}
                        aria-invalid={!!state.error?.data?.email}
                        aria-describedby={
                            state.error?.data?.email ? "email-error" : undefined
                        }
                        placeholder="name@example.com"
                        required
                        autoFocus
                    />
                    {state.error?.data?.email && (
                        <p className="text-red-500">{state.error.data.email}</p>
                    )}
                </div>
                {/* Password field */}
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-muted-foreground hover:opacity-75"
                        >
                            Forgot password?
                        </Link>
                    </div>
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
                    <div className="flex space-x-1.5">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                </div>
                <Button className="mt-2" disabled={isPending}>
                    {isPending ? "Log in..." : "Log in"}
                </Button>
            </div>
            <div className="mt-4 text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Register
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
