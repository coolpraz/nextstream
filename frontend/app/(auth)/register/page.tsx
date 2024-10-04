import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthCard from "@/components/AuthCard";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <AuthCard
            title="Create an account"
            description={
                <>
                    Enter your email and password to create an account.
                    <br />
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Login
                    </Link>
                </>
            }
        >
            <div className="grid gap-6">
                <RegisterForm />
            </div>
            <p className="px-8 mt-4 text-sm text-center text-muted-foreground">
                By creating an account, you agree to our{" "}
                <a
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </a>{" "}
                and{" "}
                <a
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </a>
                .
            </p>
        </AuthCard>
    );
};

export default RegisterPage;
