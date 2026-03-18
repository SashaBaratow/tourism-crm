import { LayoutDashboard, Map, Users, History } from "lucide-react";

export type DashboardNavItem = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
};

export const dashboardNavigation: DashboardNavItem[] = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Tours",
        href: "/tours",
        icon: Map,
    },
    {
        label: "Staff",
        href: "/staff",
        icon: Users,
    },
    {
        label: "Audit Log",
        href: "/audit",
        icon: History,
    },
];