"use client";

import { registerAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/auth/PasswordInput";

const RegisterForm = () => {
    const router = useRouter();
    const initialState: RegisterInitialState = {
        data: {},
        error: {},
        success: false,
    };
    const [state, formAction, isPending] = useActionState(
        registerAction,
        initialState
    );

    if (state.success) {
        router.push("/dashboard");
        return null;
    }
    return (
        <form action={formAction}>
            <div className="grid gap-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        name="name"
                        type="text"
                        id="name"
                        defaultValue={state.data?.name || ""}
                        className={state.error?.data?.name && "border-red-500"}
                        aria-invalid={!!state.error?.data?.name}
                        aria-describedby={
                            state.error?.data?.name ? "name-error" : undefined
                        }
                        placeholder="John Doe"
                        required
                        autoFocus
                    />
                    {state.error?.data?.name && (
                        <p className="text-red-500">{state.error.data.name}</p>
                    )}
                </div>
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
                    {isPending ? "Register..." : "Register"}
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;
