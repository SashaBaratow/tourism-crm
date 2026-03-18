"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {TourFormValues} from "@/entities/tour/model/schemas";
import {updateTourRequest} from "@/features/tour/update-tour/api/update-tour";


type Params = {
    id: number;
    values: TourFormValues;
};

export function useUpdateTour() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, values }: Params) => updateTourRequest(id, values),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tours"] });
            queryClient.invalidateQueries({ queryKey: ["tour", variables.id] });
        },
    });
}