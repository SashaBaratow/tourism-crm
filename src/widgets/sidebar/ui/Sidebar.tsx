"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {dashboardNavigation} from "@/shared/config/navigation/dashboardNavigation";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col border-r bg-white">
            <div className="border-b px-6 py-5">
                <div className="text-xl font-bold tracking-tight">Tourism CRM</div>
                <p className="mt-1 text-sm text-muted-foreground">Admin panel</p>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-3">
                {dashboardNavigation.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-black text-white"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}