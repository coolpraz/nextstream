"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";
import { NavItem } from "@/lib/nav-items";

interface DockProps {
    activeItem: string;
    navItems: NavItem[];
    setActiveItem: (name: string) => void;
    setIsSearchOpen: (isOpen: boolean) => void;
    setIsSheetOpen: (isOpen: boolean) => void;
}

const Dock = ({
    activeItem,
    navItems,
    setActiveItem,
    setIsSearchOpen,
    setIsSheetOpen,
}: DockProps) => {
    const handleNavItemClick = (item: NavItem) => {
        setActiveItem(item.name);
        if (item.subItems && item.subItems.length > 0) {
            setIsSheetOpen(true);
        } else {
            setIsSheetOpen(false);
        }
    };

    return (
        <nav className="fixed left-0 right-0 bottom-4">
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="relative hidden h-20 md:block">
                    <div className="absolute transform -translate-x-1/2 bottom-4 left-1/2">
                        <div className="flex items-center justify-center p-2 space-x-2 bg-white shadow-lg dark:bg-gray-800 bg-opacity-20 backdrop-blur-lg rounded-2xl">
                            <TooltipProvider delayDuration={0}>
                                <AnimatePresence>
                                    {navItems.map((item) => (
                                        <Tooltip key={item.name}>
                                            <TooltipTrigger asChild>
                                                <motion.button
                                                    className={`p-2 rounded-full transition-colors ${
                                                        activeItem === item.name
                                                            ? "bg-primary text-primary-foreground"
                                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                                    }`}
                                                    onClick={() =>
                                                        setActiveItem(item.name)
                                                    }
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <item.icon className="w-6 h-6" />
                                                </motion.button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="top"
                                                sideOffset={3}
                                            >
                                                <p>{item.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </AnimatePresence>
                                <div className="w-px h-8 mx-2 bg-border" />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <motion.button
                                            className="p-2 transition-colors rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                setIsSearchOpen(true)
                                            }
                                        >
                                            <Search className="w-6 h-6" />
                                        </motion.button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={3}>
                                        <p>Search</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
                {/* Mobile Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 flex justify-between px-4 py-2 bg-white border-t border-gray-200 md:hidden dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex justify-between">
                            {navItems.slice(0, 5).map((item) => (
                                <button
                                    key={item.name}
                                    className={`flex-1 group inline-flex flex-col items-center justify-center px-5 py-3 text-sm font-medium ${
                                        activeItem === item.name
                                            ? "text-primary"
                                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    }`}
                                    onClick={() => handleNavItemClick(item)}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span className="mt-1 text-[10px]">
                                        {item.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Dock;
