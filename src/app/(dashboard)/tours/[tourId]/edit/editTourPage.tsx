"use client";

import { useRouter } from "next/navigation";
import {useUpdateTour} from "@/features/tour/update-tour/model/use-update-tour";
import {UpdateTourForm} from "@/features/tour/update-tour/ui/updateTourForm";


type Tour = {
    id: number;
    tourName: string;
    startDateTime: string;
    finishDateTime: string;
    durationMinutes: number;
    touristsCount: number;
    tourPrice: string | null;
    status: "draft" | "planned" | "active" | "completed" | "cancelled";
    description: string | null;
    notes: string | null;
};

type Props = {
    tour: Tour;
};

export function EditTourView({ tour }: Props) {
    const router = useRouter();
    const { mutateAsync, isPending } = useUpdateTour();

    return (
        <UpdateTourForm
            mode="edit"
            isPending={isPending}
            defaultValues={{
                tourName: tour.tourName,
                startDateTime: String(tour.startDateTime),
                finishDateTime: String( tour.finishDateTime),
                touristsCount: tour.touristsCount,
                tourPrice: tour.tourPrice ?? "",
                status: tour.status,
                description: tour.description ?? "",
                notes: tour.notes ?? "",
            }}
            onSubmit={async (values) => {
                await mutateAsync({
                    id: tour.id,
                    values,
                });

                router.push("/tours");
                router.refresh();
            }}
        />
    );
}