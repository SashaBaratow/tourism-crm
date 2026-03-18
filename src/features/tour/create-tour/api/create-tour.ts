import type { TourFormValues } from "@/entities/tour/model/schemas";

export async function createTourRequest(values: TourFormValues): Promise<{ id: number }> {
    const response = await fetch("/api/tours", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });


    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        throw new Error(errorBody?.message || "Failed to create tour");
    }
    return response.json();
}