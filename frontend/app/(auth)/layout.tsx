import ApplicationLogo from "@/components/ApplicationLogo";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="container grid flex-col items-center justify-center h-svh bg-primary-foreground lg:max-w-none lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
                <Link
                    href="/"
                    className="flex items-center justify-center mb-4"
                >
                    <ApplicationLogo className="text-gray-500 fill-current" width={50} height={50} />
                    <h1 className="ml-3 text-xl font-medium uppercase">
                        Nextstream
                    </h1>
                </Link>
                <Card className="p-6">{children}</Card>
            </div>
        </div>
    );
};

export default Layout;
