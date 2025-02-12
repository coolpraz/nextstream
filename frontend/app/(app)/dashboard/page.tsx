import Widgets from "@/components/Widgets";

const Dashboard = async () => {
    // Simulate fetching widget data from an API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return <Widgets />;
};

export default Dashboard;
