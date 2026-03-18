import { z } from "zod";
import {tourFormSchema} from "@/entities/tour/model/schemas";

export const tourIdParamsSchema = z.object({
    tourId: z.coerce
        .number()
        .int("Tour id must be an integer")
        .positive("Tour id must be positive"),
});

export function parseCreateTourInput(input: unknown) {
    return tourFormSchema.parse(input);
}