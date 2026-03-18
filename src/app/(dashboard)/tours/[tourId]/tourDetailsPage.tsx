"use client";

import Link from "next/link";
import { useTourDetails } from "@/entities/tour/api/use-tour-details";
import { TourDetailsCard } from "@/entities/tour/ui/tour-details-card";
import { TourAssignmentsCard } from "@/entities/tour/ui/tour-assignments-card";
import { Button } from "@/shared/ui/components/ui/button";

interface TourDetailsPageProps {
    tourId: number;
}

export function TourDetailsPage({ tourId }: TourDetailsPageProps) {
    const { data, isLoading, isError, error, refetch } = useTourDetails(tourId);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />
                <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold">Failed to load tour</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    {error.message}
                </p>

                <div className="mt-4 flex gap-3">
                    <Button onClick={() => refetch()}>Try again</Button>
                    <Button asChild variant="outline">
                        <Link href="/tours">Back to tours</Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold">Tour not found</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    The requested tour does not exist.
                </p>

                <div className="mt-4">
                    <Button asChild variant="outline">
                        <Link href="/tours">Back to tours</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-sm text-muted-foreground">Tours / Details</p>
                    <h1 className="text-2xl font-semibold">Tour details</h1>
                </div>

                <div className="flex gap-3">
                    <Button asChild variant="outline">
                        <Link href="/tours">Back to tours</Link>
                    </Button>

                    <Button asChild>
                        <Link href={`/tours/${data.id}/edit`}>Edit tour</Link>
                    </Button>
                </div>
            </div>

            <TourDetailsCard tour={data} />
            <TourAssignmentsCard assignments={data.assignments} />
        </div>
    );
}