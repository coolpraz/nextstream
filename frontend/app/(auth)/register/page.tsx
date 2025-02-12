import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <>
            <h1 className="mb-8 text-2xl font-semibold text-center text-white md:text-3xl">
                Create an NextStream Account
            </h1>

            <RegisterForm />
        </>
    );
}
