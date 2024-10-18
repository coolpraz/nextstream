import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
    title: string;
    icon?: React.ReactNode;
    content: string;
    description: string;
}

const DashboardCard = ({
    title,
    icon,
    content,
    description,
}: DashboardCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{content}</div>
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
