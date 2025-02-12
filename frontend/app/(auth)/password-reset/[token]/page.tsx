import PasswordResetForm from "@/components/auth/PasswordResetForm";

const PasswordResetPage = async (props: {
    params: Promise<{ token: string }>;
}) => {
    const params = await props.params;
    return (
        <>
            <h1 className="mb-8 text-2xl font-semibold text-center text-white md:text-3xl">
                Reset Password
            </h1>
            <p>Enter your email and new password below to reset your account</p>

            <PasswordResetForm token={params.token} />
        </>
    );
};

export default PasswordResetPage;
