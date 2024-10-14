import PasswordResetForm from "@/components/auth/PasswordResetForm";
import AuthCard from "@/components/AuthCard";

const PasswordResetPage = async (props: { params: Promise<{ token: string }> }) => {
    const params = await props.params;
    return (
        <AuthCard
            title="Reset Password"
            description="Enter your email and new password below to reset your account"
        >
            <PasswordResetForm token={params.token} />
        </AuthCard>
    );
};

export default PasswordResetPage;
