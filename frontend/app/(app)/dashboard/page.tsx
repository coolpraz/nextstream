import Search from "@/components/Search";
import { Layout } from "@/components/sidebar/SidebarLayout";
import ThemeSwitch from "@/components/ThemeSwitch";
import TopNav from "@/components/TopNav";
import UserNav from "@/components/UserNav";
import { topNav } from "@/data/topNav";

const DashboardPage = async () => {
    return (
        <Layout>
            {/* ===== Top Heading ===== */}
            <Layout.Header>
                <TopNav links={topNav} />
                <div className="flex items-center ml-auto space-x-4">
                    <Search />
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>
        </Layout>
    );
};

export default DashboardPage;
