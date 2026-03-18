import type { TourStatus } from "../model/types";

export function getTourStatusClassName(status: TourStatus): string {
    switch (status) {
        case "draft":
            return "bg-slate-100 text-slate-700 border-slate-200";
        case "planned":
            return "bg-amber-100 text-amber-700 border-amber-200";
        case "active":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "completed":
            return "bg-blue-100 text-blue-700 border-blue-200";
        case "cancelled":
            return "bg-red-100 text-red-700 border-red-200";
        default:
            return "bg-slate-100 text-slate-700 border-slate-200";
    }
}