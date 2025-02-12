import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <>
            <h1 className="mb-8 text-2xl font-semibold text-center text-white md:text-3xl">
                Sign in with NextStream Account
            </h1>

            <LoginForm />
        </>
    );
}
