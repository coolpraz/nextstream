import { NavItem } from "@/lib/nav-items";

interface SidebarProps {
    activeNavItem: NavItem | undefined;
}

const Sidebar = ({ activeNavItem }: SidebarProps) => {
    return (
        <aside className="hidden w-64 bg-white border-r border-gray-200 lg:flex lg:flex-col dark:bg-gray-800 dark:border-gray-700">
            <nav className="flex-1 px-2 py-4 space-y-2">
                {activeNavItem?.subItems?.map((subItem) => (
                    <a
                        key={subItem.name}
                        href="#"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    >
                        <subItem.icon className="w-5 h-5 mr-3" />
                        {subItem.name}
                    </a>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
