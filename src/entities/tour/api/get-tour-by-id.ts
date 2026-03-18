import type { TourDetails } from "../model/types";

export async function getTourById(tourId: number): Promise<TourDetails> {
    const response = await fetch(`/api/tours/${tourId}`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        let message = "Failed to fetch tour details";

        try {
            const errorData = await response.json();
            if (errorData?.message) {
                message = errorData.message;
            }
        } catch {
            //
        }

        throw new Error(message);
    }

    return response.json();
}