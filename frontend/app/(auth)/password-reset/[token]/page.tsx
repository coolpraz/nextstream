import PasswordResetForm from "@/components/auth/PasswordResetForm";
import AuthCard from "@/components/AuthCard";

const PasswordResetPage = ({ params }: { params: { token: string } }) => {
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
