import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

const ForgotPasswordPage = () => (
    <>
        <h1 className="mb-8 text-2xl font-semibold text-center text-white md:text-3xl">
            Forgot Password
        </h1>

        <ForgotPasswordForm />

        <div className="mt-5 text-center">
            <Link
                href="/register"
                className="text-sm text-[#4dabf7] hover:text-[#74c0ff] transition-colors"
            >
                Don&apos;t have an account? Register
            </Link>
        </div>
    </>
);

export default ForgotPasswordPage;
