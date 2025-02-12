"use client";

import { registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

const RegisterForm = () => {
    const router = useRouter();
    const initialState: RegisterInitialState = {
        data: {},
        error: {},
        success: false,
    };

    const [state, formAction, isPending] = useActionState(registerAction, initialState);

    if (state.success) {
        router.push("/dashboard");
        return null;
    }

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={state.data?.name || ""}
                        aria-invalid={!!state.error?.data?.name}
                        aria-describedby={
                            state.error?.data?.name ? "name-error" : undefined
                        }
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 bg-[#2c2c2e]/50 rounded-xl text-white placeholder:text-gray-500 transition-all ${
                            state.error?.data?.name
                                ? "border-red-500 focus:ring-red-500 focus:ring-2"
                                : "border-0 focus:ring-[#4dabf7] focus:ring-2"
                        }`}
                        required
                        autoFocus
                    />
                    {state.error?.data?.name && (
                        <p className="text-xs text-red-500">
                            {state.error.data.name}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={state.data?.email || ""}
                        aria-invalid={!!state.error?.data?.email}
                        aria-describedby={
                            state.error?.data?.email ? "email-error" : undefined
                        }
                        placeholder="name@example.com"
                        className={`w-full px-4 py-3 bg-[#2c2c2e]/50 rounded-xl text-white placeholder:text-gray-500 transition-all ${
                            state.error?.data?.email
                                ? "border-red-500 focus:ring-red-500 focus:ring-2"
                                : "border-0 focus:ring-[#4dabf7] focus:ring-2"
                        }`}
                        required
                    />
                    {state.error?.data?.email && (
                        <p className="text-xs text-red-500">
                            {state.error.data.email}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        aria-invalid={!!state.error?.data?.password}
                        aria-describedby={
                            state.error?.data?.password
                                ? "password-error"
                                : undefined
                        }
                        placeholder="********"
                        className={`w-full px-4 py-3 bg-[#2c2c2e]/50 rounded-xl text-white placeholder:text-gray-500 transition-all ${
                            state.error?.data?.password
                                ? "border-red-500 focus:ring-red-500 focus:ring-2"
                                : "border-0 focus:ring-[#4dabf7] focus:ring-2"
                        }`}
                        required
                    />
                    {state.error?.data?.password && (
                        <p className="text-xs text-red-500">
                            {state.error.data.password}
                        </p>
                    )}
                </div>
                <div className="relative">
                    <Input
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        placeholder="********"
                        className="w-full px-4 py-3 bg-[#2c2c2e]/50 border-0 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#4dabf7] transition-all"
                        required
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-[#4dabf7] hover:bg-[#3b8fd7] text-white font-semibold py-3 rounded-xl transition-colors"
                disabled={isPending}
            >
                {isPending ? "Register..." : "Register"}
                <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="text-center">
                <Link
                    href="/login"
                    className="text-sm text-[#4dabf7] hover:text-[#74c0ff] transition-colors"
                >
                    Already registered?
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
