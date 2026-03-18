import type { TourStatus } from "../model/types";

export function getTourStatusLabel(status: TourStatus): string {
    switch (status) {
        case "draft":
            return "Draft";
        case "planned":
            return "Planned";
        case "active":
            return "Active";
        case "completed":
            return "Completed";
        case "cancelled":
            return "Cancelled";
        default:
            return status;
    }
}