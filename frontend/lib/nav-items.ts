import {
    Home,
    CheckSquare,
    MessageSquare,
    Grid,
    Key,
    Users,
    FileText,
    BarChart2,
    Settings,
    Truck,
    Package,
    PlusCircle,
    AlertTriangle,
    LucideIcon,
} from "lucide-react";

export interface NavItem {
    name: string;
    icon: LucideIcon;
    subItems?: NavItem[];
}

export type NavItems = NavItem[];

export const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "Tasks", icon: CheckSquare },
    { name: "Chats", icon: MessageSquare },
    { name: "Apps", icon: Grid },
    {
        name: "Authentication",
        icon: Key,
        subItems: [
            { name: "Sign In (email + password)", icon: Key },
            { name: "Sign In (box)", icon: Key },
            { name: "Sign Up", icon: PlusCircle },
            { name: "Forgot Password", icon: AlertTriangle },
            { name: "OTP", icon: Key },
        ],
    },
    { name: "Users", icon: Users },
    {
        name: "Requests",
        icon: FileText,
        subItems: [
            { name: "Trucks", icon: Truck },
            { name: "Cargos", icon: Package },
        ],
    },
    { name: "Analysis", icon: BarChart2 },
    { name: "Extra Components", icon: Grid },
    {
        name: "Error Pages",
        icon: AlertTriangle,
        subItems: [
            { name: "Not Found", icon: AlertTriangle },
            { name: "Internal Server Error", icon: AlertTriangle },
            { name: "Maintenance Error", icon: AlertTriangle },
            { name: "Unauthorised Error", icon: AlertTriangle },
        ],
    },
    { name: "Settings", icon: Settings },
];
