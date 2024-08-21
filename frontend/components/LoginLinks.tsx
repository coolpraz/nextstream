import Link from "next/link";

const LoginLinks = () => {
    return (
        <div className="fixed top-0 right-0 hidden px-6 py-4 sm:block">
            <Link href="/login" className="text-sm text-gray-700 underline">
                Login
            </Link>

            <Link
                href="/register"
                className="ml-4 text-sm text-gray-700 underline"
            >
                Register
            </Link>
        </div>
    );
};

export default LoginLinks;
