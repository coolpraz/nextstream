"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
    {
        id: 1,
        title: "New message",
        description: "You have a new message from John Doe",
    },
    {
        id: 2,
        title: "Meeting reminder",
        description: "Team meeting in 30 minutes",
    },
    {
        id: 3,
        title: "Task completed",
        description: "Project X has been marked as complete",
    },
];

const NotificationsDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Bell className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id}>
                        <div className="flex flex-col">
                            <span className="font-medium">
                                {notification.title}
                            </span>
                            <span className="text-xs text-gray-500">
                                {notification.description}
                            </span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationsDropdown;
