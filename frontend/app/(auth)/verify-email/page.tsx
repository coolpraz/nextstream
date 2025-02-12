import { auth } from "@/auth";
import VerifyEmail from "@/components/auth/VerifyEmail";

const VerifyEmailPage = async () => {
    const session = await auth();
    if (!session?.user) return null;
    return (
        <>
            <h1 className="mb-8 text-2xl font-semibold text-center text-white md:text-3xl">
                Verify Email Address
            </h1>

            <p className="mb-2 text-center text-gray-300">
                Enter the verification code sent to:
            </p>
            <p className="mb-2 text-center text-white">{session.user.email}</p>

            <VerifyEmail />
        </>
    );
};

export default VerifyEmailPage;
