import { notFound } from "next/navigation";
import {EditTourView} from "@/app/(dashboard)/tours/[tourId]/edit/editTourPage";
import {toursService} from "@/server/modules/tours/services/tours.service";


type PageProps = {
    params: Promise<{ tourId: string }>;
};

export default async function EditTourPage({ params }: PageProps) {
    const { tourId } = await params;
    const numericId = Number(tourId);

    if (!Number.isInteger(numericId)) {
        notFound();
    }

    const tour = await toursService.getTourByIdQuery(numericId);

    if (!tour) {
        notFound();
    }

    return <EditTourView tour={tour} />;
}