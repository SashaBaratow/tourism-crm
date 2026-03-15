"use client";

import { useQuery } from "@tanstack/react-query";
import { getTourById } from "./get-tour-by-id";
import type { TourDetails } from "../model/types";

export function useTourDetails(tourId: number) {
    return useQuery<TourDetails, Error>({
        queryKey: ["tour-details", tourId],
        queryFn: () => getTourById(tourId),
        enabled: Number.isFinite(tourId) && tourId > 0,
    });
}