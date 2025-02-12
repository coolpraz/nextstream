import { Card, CardContent } from "@/components/ui/card";

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <div className="min-h-screen flex items-stretch sm:items-center justify-center bg-[#1c1c1e] sm:bg-black sm:p-4">
        <Card className="w-full min-h-screen sm:min-h-0 sm:h-auto sm:max-w-md mx-auto bg-[#1c1c1e] sm:bg-[#1c1c1e]/80 border-0 shadow-none sm:shadow-2xl rounded-none sm:rounded-3xl">
            <CardContent className="flex flex-col justify-center h-full p-8 sm:p-12">
                {/* Logo with animated dots */}
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M50 100C50 72.3858 72.3858 50 100 50V50C127.614 50 150 72.3858 150 100V100C150 127.614 127.614 150 100 150V150C72.3858 150 50 127.614 50 100V100Z"
                                stroke="#FF0000"
                                strokeWidth="8"
                            />
                            <path
                                d="M75 100C75 86.1929 86.1929 75 100 75V75C113.807 75 125 86.1929 125 100V100C125 113.807 113.807 125 100 125V125C86.1929 125 75 113.807 75 100V100Z"
                                fill="#FF0000"
                            />
                            <path
                                d="M100 75L100 50"
                                stroke="#FF0000"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                            <path
                                d="M125 100L150 100"
                                stroke="#FF0000"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                            <path
                                d="M100 150L100 125"
                                stroke="#FF0000"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                            <path
                                d="M50 100L75 100"
                                stroke="#FF0000"
                                strokeWidth="8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>

                {children}
            </CardContent>
        </Card>
    </div>
);

export default AuthLayout;
