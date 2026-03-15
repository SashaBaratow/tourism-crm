import { z } from "zod";

export const tourIdParamsSchema = z.object({
    tourId: z.coerce
        .number()
        .int("Tour id must be an integer")
        .positive("Tour id must be positive"),
});