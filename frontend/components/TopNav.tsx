import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { Menu } from "lucide-react";
import { NavItem } from "@/lib/nav-items";
import { signOut } from "next-auth/react";

interface TopNavProps {
    activeItem: string;
    activeNavItem: NavItem | undefined;
    showSidebar: boolean | undefined;
    isSheetOpen: boolean;
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNav = ({
    activeItem,
    activeNavItem,
    showSidebar,
    isSheetOpen,
    setIsSheetOpen,
}: TopNavProps) => {
    return (
        <header className="flex items-center h-12 px-4 bg-white shadow-sm dark:bg-gray-800">
            <div className="flex items-center flex-1">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        {showSidebar && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 -ml-2 lg:hidden"
                            >
                                <Menu className="w-5 h-5" />
                            </Button>
                        )}
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-[240px] sm:w-[300px]"
                    >
                        <SheetHeader>
                            <SheetTitle>{activeItem}</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4 mt-4">
                            {activeNavItem &&
                                activeNavItem.subItems &&
                                activeNavItem.subItems.map((subItem) => (
                                    <button
                                        key={subItem.name}
                                        className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                                        onClick={() => setIsSheetOpen(false)}
                                    >
                                        <subItem.icon className="w-4 h-4 mr-3" />
                                        {subItem.name}
                                    </button>
                                ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <span className="ml-2 text-lg font-semibold">Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
                <NotificationsDropdown />
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-8 h-8 rounded-full"
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarImage
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="@johndoe"
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default TopNav;
