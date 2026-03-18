import type { ReactNode } from "react";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import {DashboardHeader} from "@/widgets/dashboardHeader/ui/DashboardHeader";

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-muted/30">
            <Sidebar />

            <div className="flex min-h-screen flex-1 flex-col">
                <DashboardHeader
                    title="Tourism CRM"
                    description="Manage tours, staff, and internal operations"
                />

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}