import {TourFormValues} from "@/entities/tour/model/schemas";

export async function updateTourRequest(tourId: number, payload: TourFormValues) {
    const response = await fetch(`/api/tours/${tourId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(errorBody?.message ?? "Failed to update tour");
    }

    return response.json();
}