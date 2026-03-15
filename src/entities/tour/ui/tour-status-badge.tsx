import { Badge } from "@/shared/ui/badge";
import type { TourStatus } from "../model/types";

const statusLabelMap: Record<TourStatus, string> = {
    draft: "Draft",
    planned: "Planned",
    active: "Active",
    completed: "Completed",
    cancelled: "Cancelled",
};

const statusClassMap: Record<TourStatus, string> = {
    draft: "bg-slate-100 text-slate-800 border-slate-200",
    planned: "bg-blue-100 text-blue-800 border-blue-200",
    active: "bg-emerald-100 text-emerald-800 border-emerald-200",
    completed: "bg-zinc-100 text-zinc-800 border-zinc-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
};

interface TourStatusBadgeProps {
    status: TourStatus;
}

export function TourStatusBadge({ status }: TourStatusBadgeProps) {
    return (
        <Badge variant="outline" className={statusClassMap[status]}>
            {statusLabelMap[status]}
        </Badge>
    );
}