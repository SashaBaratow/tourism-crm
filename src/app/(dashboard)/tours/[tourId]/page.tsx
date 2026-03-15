import { notFound } from "next/navigation";
import { TourDetailsPage } from "./tour-details-page";

interface PageProps {
    params: Promise<{
        tourId: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const tourId = Number(resolvedParams.tourId);

    if (!Number.isInteger(tourId) || tourId <= 0) {
        notFound();
    }

    return <TourDetailsPage tourId={tourId} />;
}