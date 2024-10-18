import DashboardCard from "@/components/DashboardCard";
import Overview from "@/components/Overview";
import RecentSales from "@/components/RecentSales";
import Search from "@/components/Search";
import { Layout } from "@/components/DashboardLayout";
import ThemeSwitch from "@/components/ThemeSwitch";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

            {/* ===== Main ===== */}
            <Layout.Body>
                <div className="flex items-center justify-between mb-2 space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <div className="flex items-center space-x-2">
                        <Button>Download</Button>
                    </div>
                </div>
                <Tabs
                    orientation="vertical"
                    defaultValue="overview"
                    className="space-y-4"
                >
                    <div className="w-full pb-2 overflow-x-auto">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                            <TabsTrigger value="notifications">
                                Notifications
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <DashboardCard
                                title="Total Revenue"
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 text-muted-foreground"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                }
                                content="$45,231.89"
                                description="+20.1% from last month"
                            />
                            <DashboardCard
                                title="Subscriptions"
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 text-muted-foreground"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                }
                                content="+2350"
                                description="+180.1% from last month"
                            />
                            <DashboardCard
                                title="Sales"
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 text-muted-foreground"
                                    >
                                        <rect
                                            width="20"
                                            height="14"
                                            x="2"
                                            y="5"
                                            rx="2"
                                        />
                                        <path d="M2 10h20" />
                                    </svg>
                                }
                                content="+12,234"
                                description="+19% from last month"
                            />
                            <DashboardCard
                                title="Active Now"
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                }
                                content="+573"
                                description="+201 since last hour"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                            <Card className="col-span-1 lg:col-span-4">
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview />
                                </CardContent>
                            </Card>
                            <Card className="col-span-1 lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Sales</CardTitle>
                                    <CardDescription>
                                        You made 265 sales this month.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </Layout.Body>
        </Layout>
    );
};

export default DashboardPage;
