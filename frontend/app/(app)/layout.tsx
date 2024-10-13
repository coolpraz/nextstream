import { auth } from "@/auth";
import AppShell from "@/components/AppShell";
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
        <div className="relative h-full overflow-hidden bg-background">
            <AppShell>
                {children}
            </AppShell>
        </div>
    );
};

export default AppLayout
