import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import AuthCard from "@/components/AuthCard";
import Link from "next/link";

const Login = () => {
    return (
        <AuthCard
            title="Login"
            description={
                <>
                    Enter your email and password below
                    <br />
                    to log into your account
                </>
            }
        >
            <div className="grid gap-6">
                <LoginForm />
            </div>
            <p className="px-8 mt-4 text-sm text-center text-muted-foreground">
                By clicking login, you agree to our{" "}
                <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </AuthCard>
    );
};

export default Login;
