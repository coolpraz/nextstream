import { Layout } from "@/components/DashboardLayout";
import Search from "@/components/Search";
import ThemeSwitch from "@/components/ThemeSwitch";
import UserNav from "@/components/UserNav";
import DataTable from "./components/DataTable";
import { tasks } from "./data/tasks";
import { columns } from "./components/columns";

const page = () => {
    return (
        <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header sticky>
                <Search />
                <div className="flex items-center ml-auto space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className="flex items-center justify-between mb-2 space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Welcome back!
                        </h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                </div>
                <div className="flex-1 px-4 py-1 -mx-4 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
                    <DataTable data={tasks} columns={columns} />
                </div>
            </Layout.Body>
        </Layout>
    );
};

export default page;
