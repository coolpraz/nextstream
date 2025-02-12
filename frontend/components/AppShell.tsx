"use client";

import { useState } from "react";
import { navItems } from "@/lib/nav-items";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import Dock from "@/components/Dock";
import SearchDialog from "./SearchDialog";

const AppShell = ({children}: { children: React.ReactNode}) => {
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const activeNavItem = navItems.find((item) => item.name === activeItem);
    const showSidebar =
        activeNavItem &&
        activeNavItem.subItems &&
        activeNavItem.subItems.length > 0;

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
            <TopNav
                activeItem={activeItem}
                activeNavItem={activeNavItem}
                showSidebar={showSidebar}
                isSheetOpen={isSheetOpen}
                setIsSheetOpen={setIsSheetOpen}
            />
            <div className="flex flex-1 overflow-hidden">
                {showSidebar && <Sidebar activeNavItem={activeNavItem} />}
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
            <Dock
                activeItem={activeItem}
                navItems={navItems}
                setIsSearchOpen={setIsSearchOpen}
                setIsSheetOpen={setIsSheetOpen}
                setActiveItem={setActiveItem}
            />
            <SearchDialog
                isOpen={isSearchOpen}
                onOpenChange={setIsSearchOpen}
            />
        </div>
    );
};

export default AppShell;
