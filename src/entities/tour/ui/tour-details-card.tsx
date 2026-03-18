import type { TourDetails } from "../model/types";
import { TourStatusBadge } from "./tour-status-badge";
import { formatDateTime } from "@/shared/lib/format/date";
import { formatDurationMinutes } from "@/shared/lib/format/duration";

interface TourDetailsCardProps {
    tour: TourDetails;
}

export function TourDetailsCard({ tour }: TourDetailsCardProps) {

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">{tour.tourName}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Tour ID: {tour.id}
                    </p>
                </div>

                <TourStatusBadge status={tour.status} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <InfoItem label="Start date/time" value={formatDateTime(tour.startDateTime)} />
                <InfoItem label="Finish date/time" value={formatDateTime(tour.finishDateTime)} />
                <InfoItem label="Duration" value={formatDurationMinutes(tour.durationMinutes)} />
                <InfoItem label="Tourists count" value={String(tour.touristsCount)} />
                <InfoItem label="Tour price" value={`$${tour.tourPrice}`} />
                <InfoItem label="Created at" value={formatDateTime(tour.createdAt)} />
                <InfoItem label="Updated at" value={formatDateTime(tour.updatedAt)} />
            </div>

            <div className="mt-6 grid gap-4">
                <TextBlock label="Description" value={tour.description} />
                <TextBlock label="Notes" value={tour.notes} />
            </div>
        </div>
    );
}

interface InfoItemProps {
    label: string;
    value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
    return (
        <div className="rounded-xl border bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
        </div>
    );
}

interface TextBlockProps {
    label: string;
    value: string | null;
}

function TextBlock({ label, value }: TextBlockProps) {
    return (
        <div className="rounded-xl border bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">
                {value?.trim() ? value : "—"}
            </p>
        </div>
    );
}