"use client";

import useIsCollapsed from "@/hooks/useIsCollapsed";
import React from "react";
import Sidebar from "./sidebar/Sidebar";

const AppShell = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();

    return (
        <>
            {/* <SkipToMain /> */}
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <main
                id="content"
                className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
                    isCollapsed ? "md:ml-14" : "md:ml-64"
                } h-full`}
            >
                {children}
            </main>
        </>
    );
};

export default AppShell;
