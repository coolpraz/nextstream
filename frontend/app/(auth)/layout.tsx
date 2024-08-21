import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import Link from "next/link";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <div className="antialiased text-gray-900">
                <AuthCard
                    logo={
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                        </Link>
                    }
                >
                    {children}
                </AuthCard>
            </div>
        </div>
    );
};

export default Layout;
