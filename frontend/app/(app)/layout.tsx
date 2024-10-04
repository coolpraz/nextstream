import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";

const AppLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div>
            <LogoutButton />
            {children}
        </div>
    );
};

export default AppLayout
