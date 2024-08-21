import {
    Card,
} from "@/components/ui/card";

const AuthCard = ({
    logo,
    children,
}: Readonly<{
    logo: React.ReactNode;
    children: React.ReactNode;
}>) => (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
        <div>{logo}</div>
        <Card className="w-full px-6 py-6 mt-6 sm:max-w-md">
            {children}
        </Card>
    </div>
);

export default AuthCard;
